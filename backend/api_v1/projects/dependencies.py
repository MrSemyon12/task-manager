from typing import Annotated

from fastapi import Depends, Path, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from api_v1.auth.dependencies import get_current_user, user_by_id
from api_v1.roles.dependencies import role_by_id
from core.config import settings
from core.models import User, Project, UserProjectAssociation, Role, db_helper
from .schemas import ProjectCreate, ProjectRole, ProjectUpdate, ProjectUser
from . import crud


async def create_project(
    project_create: ProjectCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> ProjectRole:
    project: ProjectRole = await crud.create_project(
        session=session,
        project_create=project_create,
        user=current_user,
    )
    return project


async def project_by_id(
    project_id: Annotated[int, Path(ge=1)],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Project:
    project = await crud.get_project(
        session=session,
        project_id=project_id,
    )
    if project is not None:
        return project

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Project {project_id} not found",
    )


async def current_user_role(
    user: User = Depends(get_current_user),
    project: Project = Depends(project_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Role:
    role: Role | None = await crud.get_user_role(
        session=session,
        project_id=project.id,
        user_id=user.id,
    )
    if role is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user.id} not in project {project.id}",
        )
    return role


async def manager_access_required(
    role: Role = Depends(current_user_role),
) -> Role:
    if role.id != settings.manager_role_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access denied",
        )
    return role


async def worker_access_required(
    role: Role = Depends(current_user_role),
) -> Role:
    if role.id not in [settings.manager_role_id, settings.worker_role_id]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access denied",
        )
    return role


async def update_project(
    project_update: ProjectUpdate,
    project: Project = Depends(project_by_id),
    _=Depends(manager_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Project:
    return await crud.update_project(
        session=session,
        project=project,
        project_update=project_update,
    )


async def delete_project(
    project: Project = Depends(project_by_id),
    _=Depends(manager_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_project(session=session, project=project)


async def add_user_to_project(
    user: User = Depends(user_by_id),
    role: Role = Depends(role_by_id),
    project: Project = Depends(project_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> ProjectUser:
    user_project_association: UserProjectAssociation | None = (
        await crud.get_user_project_association(
            session=session,
            project_id=project.id,
            user_id=user.id,
        )
    )
    if user_project_association is not None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user.id} already in project {project.id}",
        )
    return await crud.add_user_to_project(
        session=session,
        project=project,
        user=user,
        role=role,
    )


async def delete_user_from_project(
    user: User = Depends(user_by_id),
    project: Project = Depends(project_by_id),
    _=Depends(manager_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    user_project_association: UserProjectAssociation | None = (
        await crud.get_user_project_association(
            session=session,
            project_id=project.id,
            user_id=user.id,
        )
    )
    if user_project_association is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user.id} not in project {project.id}",
        )
    await crud.delete_user_from_project(
        session=session,
        user_project_association=user_project_association,
    )


async def update_user_role(
    user: User = Depends(user_by_id),
    project: Project = Depends(project_by_id),
    role: Role = Depends(role_by_id),
    _=Depends(manager_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> ProjectUser:
    user_project_association: UserProjectAssociation | None = (
        await crud.get_user_project_association(
            session=session,
            project_id=project.id,
            user_id=user.id,
        )
    )
    if user_project_association is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user.id} not in project {project.id}",
        )
    return await crud.update_user_role(
        session=session,
        user_project_association=user_project_association,
        role=role,
    )


async def get_outside_users(
    project: Project = Depends(project_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> list[User]:
    users = await crud.get_users(session=session)
    project_users = await crud.get_project_users(session=session, project=project)
    project_users_ids = set(map(lambda x: x.user.id, project_users))
    return list(filter(lambda x: x.id not in project_users_ids, users))

from typing import Annotated

from fastapi import Depends, Path, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.config import settings
from core.models import User, Role, UserProject, db_helper

from api_v1.auth.dependencies import get_current_user, user_by_id
from api_v1.roles.dependencies import role_by_id

from .schemas import ProjectCreate, Project, UserProjectCreate
from . import crud


async def create_project(
    project_create: ProjectCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Project:
    project: Project = await crud.create_project(
        session=session,
        project_create=project_create,
    )
    user_project_create = UserProjectCreate(
        user_id=current_user.id,
        project_id=project.id,
        role_id=settings.manager_role_id,
    )
    await crud.create_user_project(
        session=session,
        user_project_create=user_project_create,
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


async def delete_project(
    project: Project = Depends(project_by_id),
    _=Depends(manager_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_project(session=session, project=project)


async def create_user_project(
    project: Project = Depends(project_by_id),
    user: User = Depends(user_by_id),
    role: Role = Depends(role_by_id),
    _=Depends(manager_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> UserProject:
    user_role: Role | None = await crud.get_user_role(
        session=session,
        project_id=project.id,
        user_id=user.id,
    )
    if user_role is not None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User {user.id} already in project {project.id}",
        )
    user_project_create = UserProjectCreate(
        user_id=user.id,
        project_id=project.id,
        role_id=role.id,
    )
    return await crud.create_user_project(
        session=session,
        user_project_create=user_project_create,
    )

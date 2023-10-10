from typing import Annotated

from fastapi import Depends, Path, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.models import db_helper
from api_v1.auth.dependencies import get_current_user
from api_v1.auth.schemas import User

from .schemas import ProjectCreate, Project, UserProjectCreate
from . import crud


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


async def create_project(
    project_create: ProjectCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Project:
    project = await crud.create_project(
        session=session,
        project_create=project_create,
    )
    user_project_create = UserProjectCreate(
        user_id=current_user.id,
        project_id=project.id,
        role_id=1,
    )
    await crud.add_user_to_project(
        session=session,
        user_project_create=user_project_create,
    )
    return project

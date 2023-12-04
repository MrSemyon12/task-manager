from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.models import db_helper

from api_v1.auth.dependencies import get_current_user
from api_v1.auth.schemas import User

from .dependencies import (
    create_project,
    delete_project,
    add_user_to_project,
    delete_user_from_project,
    update_user_role,
    project_by_id,
    update_project,
)
from .schemas import Project, ProjectUser, ProjectRole
from . import crud


router = APIRouter(
    tags=["Projects"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/", response_model=list[Project])
async def get_projects(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_projects(session=session)


@router.post(
    "/",
    response_model=ProjectRole,
    status_code=status.HTTP_201_CREATED,
)
async def create_project(project: Project = Depends(create_project)):
    return project


@router.get("/my", response_model=list[ProjectRole])
async def get_current_user_projects(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_user_projects(
        session=session,
        user_id=current_user.id,
    )


@router.put("/{project_id}/", response_model=Project)
async def update_project(project: Project = Depends(update_project)):
    return project


@router.delete("/{project_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(_=Depends(delete_project)) -> None:
    pass


@router.get("/{project_id}/users", response_model=list[ProjectUser])
async def get_project_users(
    project: Project = Depends(project_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_project_users(session=session, project=project)


@router.post("/{project_id}/users", status_code=status.HTTP_201_CREATED)
async def add_user_to_project(_=Depends(add_user_to_project)) -> None:
    pass


@router.delete("/{project_id}/users", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_from_project(_=Depends(delete_user_from_project)) -> None:
    pass


@router.patch("/{project_id}/users")
async def update_user_role(_=Depends(update_user_role)) -> None:
    pass

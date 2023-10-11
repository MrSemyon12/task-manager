from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.models import db_helper
from core.config import settings

from api_v1.auth.dependencies import get_current_user
from api_v1.auth.schemas import User
from api_v1.roles.schemas import Role

from .schemas import Project
from .dependencies import create_project, project_by_id, get_user_role
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


@router.get("/my", response_model=list[Project])
async def get_user_projects(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_projects_by_user_id(
        session=session,
        user_id=current_user.id,
    )


@router.post(
    "/",
    response_model=Project,
    status_code=status.HTTP_201_CREATED,
)
async def create_project(project: Project = Depends(create_project)):
    return project


@router.delete("/{project_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project: Project = Depends(project_by_id),
    role: Role = Depends(get_user_role),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    if role.id != settings.manager_role_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access denied",
        )
    await crud.delete_project(session=session, project=project)


@router.get("/{project_id}/my_role", response_model=Role)
async def get_user_role(role: Role = Depends(get_user_role)) -> Role:
    return role

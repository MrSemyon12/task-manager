from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from api_v1.auth.dependencies import get_current_user
from api_v1.auth.schemas import User

from .schemas import Project
from .dependencies import create_project
from . import crud

router = APIRouter(tags=["Projects"])


@router.get("/", response_model=list[Project])
async def get_projects(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    pass


@router.post("/", response_model=Project)
async def create_project(project: Project = Depends(create_project)):
    return project

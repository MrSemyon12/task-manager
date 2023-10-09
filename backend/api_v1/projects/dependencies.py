from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from api_v1.auth.dependencies import get_current_user
from api_v1.auth.schemas import User

from .schemas import ProjectCreate, Project
from . import crud


async def create_project(
    project_create: ProjectCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Project:
    pass

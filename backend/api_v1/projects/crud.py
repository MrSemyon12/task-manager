from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Project

from .schemas import ProjectCreate


async def create_project(
    session: AsyncSession,
    project_create: ProjectCreate,
) -> Project:
    project = Project(**project_create.model_dump())
    session.add(project)
    await session.commit()
    return project

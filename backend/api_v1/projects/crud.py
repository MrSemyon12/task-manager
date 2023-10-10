from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Project, UserProject, Role

from api_v1.auth.schemas import User
from .schemas import ProjectCreate, UserProjectCreate


async def get_projects_by_user_id(
    session: AsyncSession,
    user_id: int,
) -> list[Project]:
    stmt = (
        select(Project)
        .join(UserProject)
        .where(UserProject.user_id == user_id)
        .order_by(Project.id)
    )
    result: Result = await session.execute(stmt)
    projects = result.scalars().all()
    return list(projects)


async def get_project(
    session: AsyncSession,
    project_id: int,
) -> Project | None:
    return await session.get(Project, project_id)


async def get_projects(session: AsyncSession) -> list[Project]:
    stmt = select(Project).order_by(Project.id)
    result: Result = await session.execute(stmt)
    projects = result.scalars().all()
    return list(projects)


async def create_project(
    session: AsyncSession,
    project_create: ProjectCreate,
) -> Project:
    project = Project(**project_create.model_dump())
    session.add(project)
    await session.commit()
    return project


async def add_user_to_project(
    session: AsyncSession,
    user_project_create: UserProjectCreate,
) -> UserProject:
    user_project = UserProject(**user_project_create.model_dump())
    session.add(user_project)
    await session.commit()
    return user_project


async def delete_project(
    session: AsyncSession,
    project: Project,
) -> None:
    await session.delete(project)
    await session.commit()


async def get_user_role(
    session: AsyncSession,
    project: Project,
    user: User,
) -> Role | None:
    stmt = (
        select(Role)
        .join(UserProject)
        .where(
            UserProject.project_id == project.id,
            UserProject.user_id == user.id,
        )
    )
    result: Result = await session.execute(stmt)
    role: Role = result.scalar_one_or_none()
    return role

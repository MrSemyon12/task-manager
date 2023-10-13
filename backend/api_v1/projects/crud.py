from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Project, User, UserProject, Role

from .schemas import ProjectCreate


async def create_project(
    session: AsyncSession,
    project_create: ProjectCreate,
    user: User,
) -> Project:
    project = Project(**project_create.model_dump())
    project.users.append(user)
    session.add(project)
    await session.commit()
    return project


async def get_project(
    session: AsyncSession,
    project_id: int,
) -> Project | None:
    stmt = (
        select(Project)
        .options(selectinload(Project.users))
        .where(Project.id == project_id)
    )
    result: Result = await session.execute(stmt)
    project = result.scalar_one_or_none()
    return project


async def get_user_projects(
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


async def get_projects(session: AsyncSession) -> list[Project]:
    stmt = select(Project).order_by(Project.id)
    result: Result = await session.execute(stmt)
    projects = result.scalars().all()
    return list(projects)


async def delete_project(
    session: AsyncSession,
    project: Project,
) -> None:
    await session.delete(project)
    await session.commit()


async def create_user_project(
    session: AsyncSession,
    project: Project,
    user: User,
) -> Project:
    project.users.append(user)
    session.add(project)
    await session.commit()
    return project


async def delete_user_project(
    session: AsyncSession,
    user_project: UserProject,
) -> None:
    await session.delete(user_project)
    await session.commit()


async def update_user_role(
    session: AsyncSession,
    user_project: UserProject,
    role: Role,
) -> None:
    user_project.role = role
    await session.commit()


async def get_user_role(
    session: AsyncSession, project_id: int, user_id: int
) -> Role | None:
    stmt = (
        select(Role)
        .join(UserProject)
        .where(
            UserProject.project_id == project_id,
            UserProject.user_id == user_id,
        )
    )
    result: Result = await session.execute(stmt)
    role: Role | None = result.scalar_one_or_none()
    return role


async def get_user_project(
    session: AsyncSession, project_id: int, user_id: int
) -> UserProject | None:
    stmt = select(UserProject).where(
        UserProject.project_id == project_id,
        UserProject.user_id == user_id,
    )
    result: Result = await session.execute(stmt)
    user_project = result.scalar_one_or_none()
    return user_project

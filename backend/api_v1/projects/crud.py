from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Project, User, UserProjectAssociation, Role
from api_v1.roles.crud import get_role
from .schemas import ProjectCreate, ProjectRole, ProjectUpdate


async def get_projects(session: AsyncSession) -> list[Project]:
    stmt = select(Project).order_by(Project.created_at.desc())
    result: Result = await session.execute(stmt)
    projects = result.scalars().all()
    return list(projects)


async def create_project(
    session: AsyncSession,
    project_create: ProjectCreate,
    user: User,
) -> ProjectRole:
    project = Project(**project_create.model_dump())
    role = await get_role(session=session, role_id=1)

    user.projects_details.append(
        UserProjectAssociation(
            project=project,
            role=role,
        )
    )

    session.add(project)
    await session.commit()
    return ProjectRole(project=project, role=role)


async def update_project(
    session: AsyncSession,
    project: Project,
    project_update: ProjectUpdate,
) -> Project:
    for name, value in project_update.model_dump().items():
        setattr(project, name, value)
    await session.commit()
    return project


async def get_project(
    session: AsyncSession,
    project_id: int,
) -> Project | None:
    stmt = (
        select(Project)
        .options(
            selectinload(Project.users_details).joinedload(UserProjectAssociation.user),
        )
        .options(selectinload(Project.tasks))
        .where(Project.id == project_id)
    )
    result: Result = await session.execute(stmt)
    project = result.scalar_one_or_none()
    return project


async def get_user_projects(
    session: AsyncSession,
    user_id: int,
) -> list[ProjectRole]:
    stmt = (
        select(UserProjectAssociation)
        .options(
            selectinload(UserProjectAssociation.project),
        )
        .options(selectinload(UserProjectAssociation.role))
        .where(UserProjectAssociation.user_id == user_id)
    )
    result: Result = await session.execute(stmt)
    projects = result.scalars().all()
    return list(projects)


async def get_project_users(
    session: AsyncSession,
    project: Project,
):
    stmt = (
        select(UserProjectAssociation)
        .options(selectinload(UserProjectAssociation.user))
        .options(selectinload(UserProjectAssociation.role))
        .where(UserProjectAssociation.project_id == project.id)
    )
    result: Result = await session.execute(stmt)
    users = result.scalars().all()
    return list(users)


async def delete_project(
    session: AsyncSession,
    project: Project,
) -> None:
    await session.delete(project)
    await session.commit()


async def add_user_to_project(
    session: AsyncSession,
    project: Project,
    user: User,
    role: Role,
):
    user_project = UserProjectAssociation(
        project=project,
        role=role,
    )
    user.projects_details.append(user_project)
    await session.commit()
    return user_project


async def delete_user_from_project(
    session: AsyncSession,
    user_project_association: UserProjectAssociation,
) -> None:
    await session.delete(user_project_association)
    await session.commit()


async def update_user_role(
    session: AsyncSession,
    user_project_association: UserProjectAssociation,
    role: Role,
):
    user_project_association.role = role
    await session.commit()
    return user_project_association


async def get_user_role(
    session: AsyncSession, project_id: int, user_id: int
) -> Role | None:
    stmt = (
        select(Role)
        .join(UserProjectAssociation)
        .where(
            UserProjectAssociation.project_id == project_id,
            UserProjectAssociation.user_id == user_id,
        )
    )
    result: Result = await session.execute(stmt)
    role: Role | None = result.scalar_one_or_none()
    return role


async def get_user_project_association(
    session: AsyncSession, project_id: int, user_id: int
) -> UserProjectAssociation | None:
    stmt = select(UserProjectAssociation).where(
        UserProjectAssociation.project_id == project_id,
        UserProjectAssociation.user_id == user_id,
    )
    result: Result = await session.execute(stmt)
    user_project_association = result.scalar_one_or_none()
    return user_project_association

from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.models import Task, Project, Priority, State
from .schemas import TaskCreate


async def create_task(
    session: AsyncSession,
    task_create: TaskCreate,
    project: Project,
    priority: Priority,
    state: State,
) -> Task:
    task = Task(
        state=state,
        project=project,
        priority=priority,
        **task_create.model_dump(),
    )
    session.add(task)
    await session.commit()
    return task


async def get_tasks(
    session: AsyncSession,
    project: Project,
) -> list[Task]:
    stmt = (
        select(Task)
        .options(selectinload(Task.priority))
        .options(selectinload(Task.state))
        .where(Task.project_id == project.id)
        .order_by(Task.id)
    )
    result: Result = await session.execute(stmt)
    tasks = result.scalars().all()
    return list(tasks)

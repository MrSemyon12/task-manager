from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.models import Task, Project, Priority, State
from .schemas import TaskCreate, TaskUpdatePartial


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


async def get_task(
    session: AsyncSession,
    task_id: int,
) -> Task | None:
    stmt = (
        select(Task)
        .options(selectinload(Task.state))
        .options(selectinload(Task.priority))
        .where(Task.id == task_id)
    )
    result: Result = await session.execute(stmt)
    task = result.scalar_one_or_none()
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


async def update_task_info(
    session: AsyncSession,
    task: Task,
    task_update: TaskUpdatePartial,
    priority: Priority,
) -> Task:
    for name, value in task_update.model_dump(exclude_unset=True).items():
        setattr(task, name, value)
    task.priority = priority
    await session.commit()
    return task


async def update_task_state(
    session: AsyncSession,
    task: Task,
    state: State,
) -> Task:
    task.state = state
    await session.commit()
    return task


async def delete_task(
    session: AsyncSession,
    task: Task,
) -> None:
    await session.delete(task)
    await session.commit()

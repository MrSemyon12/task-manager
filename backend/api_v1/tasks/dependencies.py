from typing import Annotated

from fastapi import Depends, Path, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.models import Task, State, Priority, Project, db_helper

from api_v1.priorities.dependencies import priority_by_id
from api_v1.projects.dependencies import (
    project_by_id,
    manager_access_required,
    worker_access_required,
)
from api_v1.states.dependencies import state_by_id

from .schemas import TaskCreate, TaskUpdatePartial
from . import crud


async def create_task(
    task_create: TaskCreate,
    project: Project = Depends(project_by_id),
    priority: Priority = Depends(priority_by_id),
    state: State = Depends(state_by_id),
    _=Depends(manager_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Task:
    return await crud.create_task(
        session=session,
        task_create=task_create,
        project=project,
        priority=priority,
        state=state,
    )


async def task_by_id(
    task_id: Annotated[int, Path(ge=1)],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Task:
    task = await crud.get_task(session=session, task_id=task_id)
    if task is not None:
        return task

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Task {task_id} not found",
    )


async def get_tasks(
    project: Project = Depends(project_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> list[Task]:
    return await crud.get_tasks(
        session=session,
        project=project,
    )


async def update_task_info(
    task_update: TaskUpdatePartial,
    priority: Priority = Depends(priority_by_id),
    task: Task = Depends(task_by_id),
    _=Depends(manager_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Task:
    return await crud.update_task_info(
        session=session,
        task=task,
        task_update=task_update,
        priority=priority,
    )


async def update_task_state(
    state: State = Depends(state_by_id),
    task: Task = Depends(task_by_id),
    _=Depends(worker_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_task_state(
        session=session,
        task=task,
        state=state,
    )


async def delete_task(
    task: Task = Depends(task_by_id),
    _=Depends(manager_access_required),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_task(session=session, task=task)

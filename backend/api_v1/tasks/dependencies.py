from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Task, State, Priority, Project, db_helper

from api_v1.priorities.dependencies import priority_by_id
from api_v1.projects.dependencies import project_by_id, manager_access_required
from api_v1.states.dependencies import state_by_id

from . import crud
from .schemas import TaskCreate


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


async def get_tasks(
    project: Project = Depends(project_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> list[Task]:
    return await crud.get_tasks(
        session=session,
        project=project,
    )

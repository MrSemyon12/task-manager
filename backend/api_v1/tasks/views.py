from fastapi import APIRouter, Depends
from starlette import status

from api_v1.auth.dependencies import get_current_user

from .dependencies import (
    create_task,
    get_tasks,
    update_task_info,
    update_task_state,
    update_task_priority,
    delete_task,
)
from .schemas import Task


router = APIRouter(
    tags=["Tasks"],
    dependencies=[Depends(get_current_user)],
)


@router.post("/", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(task=Depends(create_task)):
    return task


@router.get("/", response_model=list[Task])
async def get_tasks(tasks=Depends(get_tasks)):
    return tasks


@router.patch("/{task_id}/info", response_model=Task)
async def update_task_info(task=Depends(update_task_info)):
    return task


@router.patch("/{task_id}/state", response_model=Task)
async def update_task_state(task=Depends(update_task_state)):
    return task


@router.patch("/{task_id}/priority", response_model=Task)
async def update_task_priority(task=Depends(update_task_priority)):
    return task


@router.delete("/{task_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(_=Depends(delete_task)) -> None:
    pass

from fastapi import APIRouter, Depends
from starlette import status

from api_v1.auth.dependencies import get_current_user

from .dependencies import create_task, get_tasks
from .schemas import Task


router = APIRouter(
    tags=["Tasks"],
    dependencies=[Depends(get_current_user)],
)


@router.post(
    "/{project_id}/",
    response_model=Task,
    status_code=status.HTTP_201_CREATED,
)
async def create_task(task: Task = Depends(create_task)):
    return task


@router.get(
    "/{project_id}/",
    response_model=list[Task],
    status_code=status.HTTP_201_CREATED,
)
async def get_tasks(tasks: list[Task] = Depends(get_tasks)):
    return tasks

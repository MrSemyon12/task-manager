from datetime import datetime

from pydantic import BaseModel, ConfigDict

from api_v1.priorities.schemas import Priority
from api_v1.states.schemas import State


class TaskBase(BaseModel):
    title: str
    description: str
    deadline: datetime


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    priority: Priority
    state: State

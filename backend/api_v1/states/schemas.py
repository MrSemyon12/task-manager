from enum import Enum

from pydantic import BaseModel, ConfigDict


class StateEnum(Enum):
    OPEN = "open"
    PROGRESS = "progress"
    DONE = "done"
    CLOSED = "closed"


class StateBase(BaseModel):
    title: StateEnum


class State(StateBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

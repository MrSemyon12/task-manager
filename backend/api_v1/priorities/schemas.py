from enum import Enum

from pydantic import BaseModel, ConfigDict


class PriorityEnum(Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class PriorityBase(BaseModel):
    title: PriorityEnum


class Priority(PriorityBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

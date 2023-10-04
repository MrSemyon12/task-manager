from enum import Enum

from pydantic import BaseModel, ConfigDict


class RoleEnum(Enum):
    MANAGER = "manager"
    WORKER = "worker"
    GUEST = "guest"


class RoleBase(BaseModel):
    title: RoleEnum


class Role(RoleBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

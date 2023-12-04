from pydantic import BaseModel, ConfigDict

from api_v1.auth.schemas import User
from api_v1.roles.schemas import Role


class ProjectBase(BaseModel):
    title: str
    description: str
    is_private: bool


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class ProjectRole(BaseModel):
    project: Project
    role: Role


class ProjectUser(BaseModel):
    user: User
    role: Role

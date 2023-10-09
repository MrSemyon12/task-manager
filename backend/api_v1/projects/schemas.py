from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    title: str
    description: str
    is_private: bool


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

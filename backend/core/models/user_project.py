from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import UserRelationMixin, ProjectRelationMixin


class UserProject(Base, UserRelationMixin, ProjectRelationMixin):
    __tablename__ = "users_projects"

    _user_back_populates = "projects"
    _project_back_populates = "users"

    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"))

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from .mixins import UserRelationMixin, ProjectRelationMixin

if TYPE_CHECKING:
    from .role import Role


class UserProject(Base, UserRelationMixin, ProjectRelationMixin):
    __tablename__ = "users_projects"

    _user_back_populates = "projects"
    _user_id_unique = True

    _project_back_populates = "users"
    _project_id_unique = True

    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"))
    role: Mapped["Role"] = relationship(back_populates="projects")

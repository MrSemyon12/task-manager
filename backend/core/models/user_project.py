from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from .mixins import UserRelationMixin, ProjectRelationMixin

if TYPE_CHECKING:
    from .role import Role


class UserProject(Base, UserRelationMixin, ProjectRelationMixin):
    __tablename__ = "users_projects"

    id = None

    _user_id_primary_key = True
    _user_back_populates = "projects"

    _project_id_primary_key = True
    _project_back_populates = "users"

    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"))
    role: Mapped["Role"] = relationship(back_populates="users_projects")

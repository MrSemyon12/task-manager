from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .project import Project
    from .role import Role


class UserProject(Base):
    __tablename__ = "user_projects"

    id = None

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        primary_key=True,
    )
    user: Mapped["User"] = relationship(
        back_populates="project_associations",
    )

    project_id: Mapped[int] = mapped_column(
        ForeignKey("projects.id"),
        primary_key=True,
    )
    project: Mapped["Project"] = relationship(
        back_populates="user_associations",
    )

    role_id: Mapped[int] = mapped_column(
        ForeignKey("roles.id"),
        default="1",
        server_default="1",
    )
    role: Mapped["Role"] = relationship(back_populates="user_projects")

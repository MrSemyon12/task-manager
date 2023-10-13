from typing import TYPE_CHECKING

from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .task import Task
    from .user import User
    from .user_project import UserProject


class Project(Base):
    title: Mapped[str] = mapped_column(String(32))
    description: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
    )
    is_private: Mapped[bool]

    users: Mapped[list["User"]] = relationship(
        secondary="user_projects",
        back_populates="projects",
    )
    user_associations: Mapped[list["UserProject"]] = relationship(
        back_populates="project",
        cascade="all, delete",
    )

    tasks: Mapped[list["Task"]] = relationship(
        back_populates="project",
        cascade="all, delete",
    )

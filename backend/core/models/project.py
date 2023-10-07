from typing import TYPE_CHECKING

from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .user_project import UserProject
    from .task import Task


class Project(Base):
    title: Mapped[str] = mapped_column(String(32))
    description: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
    )
    is_private: Mapped[bool]

    users: Mapped[list["UserProject"]] = relationship(back_populates="project")
    tasks: Mapped[list["Task"]] = relationship(back_populates="project")

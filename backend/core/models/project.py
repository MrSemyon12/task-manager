from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .task import Task
    from .user_project_association import UserProjectAssociation


class Project(Base):
    title: Mapped[str] = mapped_column(String(32))
    description: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
    )
    created_at: Mapped[datetime] = mapped_column(
        server_default=func.now(),
        default=datetime.utcnow,
    )
    is_private: Mapped[bool]

    users_details: Mapped[list["UserProjectAssociation"]] = relationship(
        back_populates="project",
        cascade="all, delete",
    )

    tasks: Mapped[list["Task"]] = relationship(
        back_populates="project",
        cascade="all, delete",
    )

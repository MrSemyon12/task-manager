from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from .mixins import ProjectRelationMixin

if TYPE_CHECKING:
    from .state import State
    from .priority import Priority


class Task(Base, ProjectRelationMixin):
    _project_back_populates = "tasks"

    title: Mapped[str] = mapped_column(String(32))
    description: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
    )
    deadline: Mapped[datetime | None]

    state_id: Mapped[int] = mapped_column(ForeignKey("states.id"))
    state: Mapped["State"] = relationship(back_populates="tasks")

    priority_id: Mapped[int] = mapped_column(ForeignKey("priorities.id"))
    priority: Mapped["Priority"] = relationship(back_populates="tasks")

    # parent_id: Mapped[int | None] = mapped_column(ForeignKey("tasks.id"))
    # parent: Mapped["Task"] = relationship(back_populates="subtasks")
    #
    # subtasks: Mapped[list["Task"]] = relationship(back_populates="parent")

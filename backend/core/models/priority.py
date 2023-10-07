from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, relationship

from .base import BaseEnum

if TYPE_CHECKING:
    from .task import Task


class Priority(BaseEnum):
    __tablename__ = "priorities"

    tasks: Mapped[list["Task"]] = relationship(back_populates="priority")

from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, relationship

from .base import BaseEnum

if TYPE_CHECKING:
    from .user_project import UserProject


class Role(BaseEnum):
    projects: Mapped[list["UserProject"]] = relationship(back_populates="role")

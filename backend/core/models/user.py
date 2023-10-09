from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .notice import Notice
    from .user_project import UserProject


class User(Base):
    username: Mapped[str] = mapped_column(String(16), unique=True)
    hashed_password: Mapped[str]
    email: Mapped[str | None]

    notices: Mapped[list["Notice"]] = relationship(back_populates="user")
    projects: Mapped[list["UserProject"]] = relationship(back_populates="user")

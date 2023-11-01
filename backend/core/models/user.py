from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .notice import Notice
    from .project import Project
    from .user_project import UserProject
    from .session import Session


class User(Base):
    username: Mapped[str] = mapped_column(String(16), unique=True)
    hashed_password: Mapped[str]
    email: Mapped[str | None]

    session: Mapped["Session"] = relationship(back_populates="user")

    projects: Mapped[list["Project"]] = relationship(
        secondary="user_projects",
        back_populates="users",
    )
    project_associations: Mapped[list["UserProject"]] = relationship(
        back_populates="user",
        cascade="all, delete",
    )

    notices: Mapped[list["Notice"]] = relationship(
        back_populates="user",
        cascade="all, delete",
    )

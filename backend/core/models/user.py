from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .notice import Notice
    from .session import Session
    from .user_project_association import UserProjectAssociation


class User(Base):
    username: Mapped[str] = mapped_column(String(16), unique=True)
    hashed_password: Mapped[str]
    email: Mapped[str | None]

    session: Mapped["Session"] = relationship(back_populates="user")

    projects_details: Mapped[list["UserProjectAssociation"]] = relationship(
        back_populates="user",
    )

    notices: Mapped[list["Notice"]] = relationship(
        back_populates="user",
        cascade="all, delete",
    )

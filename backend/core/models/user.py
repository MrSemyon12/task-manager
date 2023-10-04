from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .notice import Notice


class User(Base):
    username: Mapped[str] = mapped_column(String(16), unique=True)
    hashed_password: Mapped[str]

    notices: Mapped[list["Notice"]] = relationship(back_populates="user")

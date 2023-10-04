from typing import TYPE_CHECKING

from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .user import User


class Notice(Base):
    title: Mapped[str] = mapped_column(String(32))
    description: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
    )
    had_seen: Mapped[bool] = mapped_column(
        default=False,
        server_default="0",
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )
    user: Mapped["User"] = relationship(back_populates="notices")

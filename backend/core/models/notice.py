from sqlalchemy import String, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


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

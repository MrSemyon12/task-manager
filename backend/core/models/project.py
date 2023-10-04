from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class Project(Base):
    title: Mapped[str] = mapped_column(String(32))
    description: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
    )
    is_private: Mapped[bool]

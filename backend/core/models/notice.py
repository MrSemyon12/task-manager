from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import UserRelationMixin


class Notice(Base, UserRelationMixin):
    _user_back_populates = "notices"

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

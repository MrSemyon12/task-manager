from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import UserRelationMixin


class Session(Base, UserRelationMixin):
    _user_id_unique = True
    _user_back_populates = "session"

    refresh_token: Mapped[str] = mapped_column(String(64), unique=True)

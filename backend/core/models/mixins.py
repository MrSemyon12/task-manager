from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import declared_attr, Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from .user import User
    from .project import Project


class UserRelationMixin:
    _user_id_unique: bool = False
    _user_id_nullable: bool = False
    _user_id_primary_key: bool = False
    _user_back_populates: str | None = None

    @declared_attr
    def user_id(cls) -> Mapped[int]:
        return mapped_column(
            ForeignKey("users.id"),
            unique=cls._user_id_unique,
            nullable=cls._user_id_nullable,
            primary_key=cls._user_id_primary_key,
        )

    @declared_attr
    def user(cls) -> Mapped["User"]:
        return relationship(
            "User",
            back_populates=cls._user_back_populates,
        )


class ProjectRelationMixin:
    _project_id_unique: bool = False
    _project_id_nullable: bool = False
    _project_id_primary_key: bool = False
    _project_back_populates: str | None = None

    @declared_attr
    def project_id(cls) -> Mapped[int]:
        return mapped_column(
            ForeignKey("projects.id"),
            unique=cls._project_id_unique,
            nullable=cls._project_id_nullable,
            primary_key=cls._project_id_primary_key,
        )

    @declared_attr
    def project(cls) -> Mapped["Project"]:
        return relationship(
            "Project",
            back_populates=cls._project_back_populates,
        )

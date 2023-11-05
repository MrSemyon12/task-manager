from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .project import Project
    from .role import Role


class UserProjectAssociation(Base):
    __tablename__ = "user_project_association"
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "project_id",
            name="idx_unique_user_project",
        ),
    )

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"))
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"))

    # association between Association -> User
    user: Mapped["User"] = relationship(
        back_populates="projects_details",
    )
    # association between Association -> Project
    project: Mapped["Project"] = relationship(
        back_populates="users_details",
    )

    role: Mapped["Role"] = relationship(back_populates="user_project_associations")

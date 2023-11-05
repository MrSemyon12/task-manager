from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, relationship

from .base import BaseEnum

if TYPE_CHECKING:
    from .user_project_association import UserProjectAssociation


class Role(BaseEnum):
    user_project_associations: Mapped[list["UserProjectAssociation"]] = relationship(
        back_populates="role"
    )

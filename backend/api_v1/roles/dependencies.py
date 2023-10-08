from typing import Annotated

from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper, Role

from . import crud


async def role_by_id(
    role_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Role:
    role = await crud.get_role(session=session, role_id=role_id)
    if role is not None:
        return role

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Role {role_id} not found!",
    )

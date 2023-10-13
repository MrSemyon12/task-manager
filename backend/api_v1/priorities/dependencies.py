from typing import Annotated

from fastapi import Depends, HTTPException, status, Body
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper, Priority
from . import crud


async def priority_by_id(
    priority_id: Annotated[int, Body(ge=1)],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Priority:
    priority = await crud.get_priority(session=session, priority_id=priority_id)
    if priority is not None:
        return priority

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Priority {priority_id} not found",
    )

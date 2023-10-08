from typing import Annotated

from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper, State

from . import crud


async def state_by_id(
    state_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> State:
    state = await crud.get_state(session=session, state_id=state_id)
    if state is not None:
        return state

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"State {state_id} not found",
    )

from typing import Annotated

from fastapi import Depends, HTTPException, status, Body
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import State, db_helper

from . import crud


async def state_by_id(
    state_id: Annotated[int, Body(ge=1)],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> State:
    state = await crud.get_state(session=session, state_id=state_id)
    if state is not None:
        return state

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"State {state_id} not found",
    )


async def get_states(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> list[State]:
    return await crud.get_states(session=session)

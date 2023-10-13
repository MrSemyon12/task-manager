from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import State


async def get_states(session: AsyncSession) -> list[State]:
    stmt = select(State).order_by(State.id)
    result: Result = await session.execute(stmt)
    states = result.scalars().all()
    return list(states)


async def get_state(session: AsyncSession, state_id: int) -> State | None:
    return await session.get(State, state_id)

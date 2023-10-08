from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Priority


async def get_priorities(session: AsyncSession) -> list[Priority]:
    stmt = select(Priority).order_by(Priority.id)
    result: Result = await session.execute(stmt)
    priorities = result.scalars().all()
    return list(priorities)


async def get_priority(session: AsyncSession, priority_id: int) -> Priority | None:
    return await session.get(Priority, priority_id)

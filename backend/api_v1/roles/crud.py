from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Role


async def get_roles(session: AsyncSession) -> list[Role]:
    stmt = select(Role).order_by(Role.id)
    result: Result = await session.execute(stmt)
    roles = result.scalars().all()
    return list(roles)


async def get_role(session: AsyncSession, role_id: int) -> Role | None:
    return await session.get(Role, role_id)

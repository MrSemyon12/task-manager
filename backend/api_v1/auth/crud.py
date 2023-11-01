from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import User, Session

from .schemas import UserInDB


async def get_users(session: AsyncSession) -> list[User]:
    stmt = select(User).order_by(User.id)
    result: Result = await session.execute(stmt)
    users = result.scalars().all()
    return list(users)


async def get_user(session: AsyncSession, user_id: int) -> User | None:
    return await session.get(User, user_id)


async def get_user_session(session: AsyncSession, user_id: int) -> Session | None:
    stmt = select(Session).where(Session.user_id == user_id)
    result: Result = await session.execute(stmt)
    user_session: Session | None = result.scalar_one_or_none()
    return user_session


async def get_user_by_username(session: AsyncSession, username: str) -> User | None:
    stmt = select(User).where(User.username == username)
    result: Result = await session.execute(stmt)
    user: User | None = result.scalar_one_or_none()
    return user


async def create_user(session: AsyncSession, user_db: UserInDB) -> User:
    user = User(**user_db.model_dump())
    session.add(user)
    await session.commit()
    return user


async def create_user_session(
    session: AsyncSession, user: User, refresh_token: str
) -> Session:
    user_session = Session(
        user_id=user.id,
        refresh_token=refresh_token,
    )
    user.session = user_session
    session.add(user_session)
    await session.commit()
    return user_session


async def update_user_session(
    session: AsyncSession, user_session: Session, refresh_token: str
) -> Session:
    setattr(user_session, "refresh_token", refresh_token)
    await session.commit()
    return user_session

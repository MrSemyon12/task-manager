from sqlalchemy.ext.asyncio import AsyncSession

from core.models import User
from . import crud


async def update_refresh_token(
    session: AsyncSession, user: User, refresh_token: str
) -> None:
    user_session = await crud.get_user_session(
        session=session,
        user_id=user.id,
    )
    if user_session:
        await crud.update_user_session(
            session=session,
            user_session=user_session,
            refresh_token=refresh_token,
        )
    else:
        await crud.create_user_session(
            session=session,
            user=user,
            refresh_token=refresh_token,
        )

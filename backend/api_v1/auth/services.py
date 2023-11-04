from datetime import datetime

from fastapi import HTTPException
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.models import User
from .utils import decode_token
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


async def validate_token(
    session: AsyncSession,
    token: str,
    refresh: bool = False,
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token, refresh=refresh)
        username: str = payload.get("sub")
        expire: int = payload.get("exp")
        if username is None or expire is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    if datetime.fromtimestamp(expire) < datetime.utcnow():
        raise credentials_exception

    user = await crud.get_user_by_username(
        session=session,
        username=username,
    )
    if user is None:
        raise credentials_exception

    if refresh:
        if user.session is None:
            raise credentials_exception

        if user.session.refresh_token != token:
            raise credentials_exception

    return user

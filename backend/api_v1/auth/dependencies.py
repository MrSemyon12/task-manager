from typing import Annotated

from fastapi import Body, Depends, HTTPException, status, Cookie
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper, User
from core.config import settings

from .utils import get_password_hash, verify_password, create_token
from .services import validate_token
from .schemas import UserCreate, UserInDB
from . import crud


oauth2_scheme = OAuth2PasswordBearer(tokenUrl=settings.auth.token_url)


async def authenticate_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user = await crud.get_user_by_username(
        session=session,
        username=form_data.username,
    )
    if not user:
        raise credentials_exception

    if not verify_password(form_data.password, user.hashed_password):
        raise credentials_exception

    return user


async def get_current_user(
    access_token: str = Depends(oauth2_scheme),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> User:
    return await validate_token(session=session, token=access_token)


async def refresh_access_token(
    refresh_token: str | None = Cookie(),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> str:
    if refresh_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user: User = await validate_token(
        session=session, token=refresh_token, refresh=True
    )
    access_token = create_token(data={"sub": user.username})
    return access_token


async def logout_user(
    refresh_token: str | None = Cookie(),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    if refresh_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user: User = await validate_token(
        session=session, token=refresh_token, refresh=True
    )
    await crud.delete_user_session(
        session=session,
        user_session=user.session,
    )


async def create_user(
    user_create: UserCreate,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> User:
    user = await crud.get_user_by_username(
        session=session,
        username=user_create.username,
    )
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    user_db = UserInDB(
        username=user_create.username,
        email=user_create.email,
        hashed_password=get_password_hash(user_create.password),
    )
    user = await crud.create_user(
        session=session,
        user_db=user_db,
    )
    return user


async def user_by_id(
    user_id: Annotated[int, Body(ge=1)],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> User:
    user = await crud.get_user(session=session, user_id=user_id)
    if user is not None:
        return user

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"User {user_id} not found",
    )

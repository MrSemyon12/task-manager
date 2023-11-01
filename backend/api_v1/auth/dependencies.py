from typing import Annotated

from fastapi import Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError

from core.models import db_helper, User
from core.config import settings

from .utils import decode_access_token, get_password_hash, verify_password
from .schemas import UserCreate, UserInDB
from . import crud


oauth2_scheme = OAuth2PasswordBearer(tokenUrl=settings.auth.token_url)


async def authenticate_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
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
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_access_token(access_token)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = await crud.get_user_by_username(
        session=session,
        username=username,
    )
    if user is None:
        raise credentials_exception
    return user


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

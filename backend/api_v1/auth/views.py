from fastapi import APIRouter, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.models import db_helper
from .dependencies import (
    authenticate_user,
    create_user,
    get_current_user,
    refresh_access_token,
    logout_user,
)
from .services import update_refresh_token
from .utils import create_token
from .schemas import Token, User


router = APIRouter(tags=["Auth"])


@router.post("/login", response_model=Token)
async def login_for_access_token(
    response: Response,
    user=Depends(authenticate_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    access_token = create_token(data={"sub": user.username})
    refresh_token = create_token(data={"sub": user.username}, refresh=True)

    await update_refresh_token(
        session=session,
        user=user,
        refresh_token=refresh_token,
    )
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)

    return Token(access_token=access_token)


@router.post(
    "/register",
    response_model=User,
    status_code=status.HTTP_201_CREATED,
)
def register_user(user: User = Depends(create_user)):
    return user


@router.get("/refresh", response_model=Token)
def refresh_access_token(access_token: str = Depends(refresh_access_token)):
    return Token(access_token=access_token)


@router.get("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(_=Depends(logout_user)):
    pass

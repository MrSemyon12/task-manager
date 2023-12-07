from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api_v1.auth.dependencies import get_current_user

from api_v1.auth.schemas import User
from core.models import db_helper
from . import crud

router = APIRouter(
    tags=["Users"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/", response_model=list[User])
async def get_users(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_users(session=session)

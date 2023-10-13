from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from api_v1.auth.dependencies import get_current_user

from .schemas import State
from . import crud

router = APIRouter(
    tags=["States"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/", response_model=list[State])
async def get_states(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_states(session=session)

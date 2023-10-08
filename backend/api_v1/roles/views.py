from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from api_v1.auth.dependencies import get_current_user

from .dependencies import role_by_id
from .schemas import Role
from . import crud

router = APIRouter(
    tags=["Roles"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/", response_model=list[Role])
async def get_roles(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_roles(session=session)


@router.get("/{role_id}/", response_model=Role)
async def get_role(
    role: Role = Depends(role_by_id),
):
    return role

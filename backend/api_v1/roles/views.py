from fastapi import APIRouter, Depends

from api_v1.auth.dependencies import get_current_user

from .dependencies import get_roles
from .schemas import Role


router = APIRouter(
    tags=["Roles"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/", response_model=list[Role])
async def get_roles(roles=Depends(get_roles)):
    return roles

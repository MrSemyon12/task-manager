from fastapi import APIRouter, Depends

from api_v1.auth.dependencies import get_current_user

from .dependencies import get_priorities
from .schemas import Priority


router = APIRouter(
    tags=["Priorities"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/", response_model=list[Priority])
async def get_priorities(priorities=Depends(get_priorities)):
    return priorities

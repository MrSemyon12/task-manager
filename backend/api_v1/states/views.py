from fastapi import APIRouter, Depends

from api_v1.auth.dependencies import get_current_user

from .dependencies import get_states
from .schemas import State


router = APIRouter(
    tags=["States"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/", response_model=list[State])
async def get_states(states=Depends(get_states)):
    return states

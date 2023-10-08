from fastapi import APIRouter, Depends

from .dependencies import authenticate_user, create_user
from .utils import create_access_token
from .schemas import Token, User


router = APIRouter(tags=["Auth"])


@router.post("/login", response_model=Token)
async def login_for_access_token(user: User = Depends(authenticate_user)):
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=User)
def register_user(user: User = Depends(create_user)):
    return user

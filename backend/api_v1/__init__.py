from fastapi import APIRouter

from .priorities.views import router as priorities_router
from .states.views import router as states_router
from .roles.views import router as roles_router


router = APIRouter()
router.include_router(router=priorities_router, prefix="/priorities")
router.include_router(router=states_router, prefix="/states")
router.include_router(router=roles_router, prefix="/roles")

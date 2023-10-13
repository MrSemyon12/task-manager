from fastapi import APIRouter

from .auth.views import router as auth_router
from .projects.views import router as projects_router
from .tasks.views import router as tasks_router
from .roles.views import router as roles_router
from .states.views import router as states_router
from .priorities.views import router as priorities_router


router = APIRouter()
router.include_router(router=auth_router, prefix="/auth")
router.include_router(router=projects_router, prefix="/projects")
router.include_router(router=tasks_router, prefix="/projects/{project_id}/tasks")
router.include_router(router=roles_router, prefix="/roles")
router.include_router(router=states_router, prefix="/states")
router.include_router(router=priorities_router, prefix="/priorities")

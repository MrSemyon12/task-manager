export const BASE_AUTH_URL = '/auth';
export const LOGIN_URL = `${BASE_AUTH_URL}/login`;
export const LOGOUT_URL = `${BASE_AUTH_URL}/logout`;
export const REGISTER_URL = `${BASE_AUTH_URL}/register`;
export const REFRESH_URL = `${BASE_AUTH_URL}/refresh`;

export const BASE_PROJECTS_URL = '/projects/';
export const USER_PROJECTS_URL = `${BASE_PROJECTS_URL}my`;
export const DELETE_PROJECT_URL = `${BASE_PROJECTS_URL}:projectId/`;
export const UPDATE_PROJECT_URL = `${BASE_PROJECTS_URL}:projectId/`;
export const PROJECT_USERS_URL = `${BASE_PROJECTS_URL}:projectId/users`;
export const OUTSIDE_USERS_URL = `${BASE_PROJECTS_URL}:projectId/outside`;

export const BASE_TASKS_URL = `${BASE_PROJECTS_URL}:projectId/tasks/`;
export const DELETE_TASKS_URL = `${BASE_TASKS_URL}:taskId/`;
export const UPDATE_TASKS_STATE_URL = `${BASE_TASKS_URL}:taskId/state`;
export const UPDATE_TASKS_INFO_URL = `${BASE_TASKS_URL}:taskId/info`;

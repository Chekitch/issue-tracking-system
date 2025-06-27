export const API_BASE_URL = 'http://localhost:8080/api';

export const AUTH = {
    LOGIN: '/auth/login'
};

export const PARENT_PROJECTS = {

    BASE: '/parent-projects',
    BY_ID: (id: string) => `/parent-projects/${id}`,
    SUBPROJECTS: (parentId: string) => `/parent-projects/${parentId}/sub-projects`
};

export const SUBPROJECTS = {
    BASE: '/sub-projects',
    BY_ID: (id: string) => `/sub-projects/${id}`,
    ISSUES: (subProjectId: string) => `/sub-projects/${subProjectId}/issues`
}
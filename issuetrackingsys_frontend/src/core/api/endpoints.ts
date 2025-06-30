export const API_BASE_URL = 'http://localhost:8080/api';

export const AUTH = {
    LOGIN: '/auth/login'
};

export const PARENT_PROJECTS = {

    ALL: () => `/parent-projects`,
    BY_ID: (id: string) => `/parent-projects/${id}`,
    CREATE: () => `/parent-projects`,
    UPDATE: (id: string) => `/parent-projects/${id}`,
    DELETE: (id: string) => `/parent-projects/${id}`, 
};

export const SUBPROJECTS = {
    ALL: (parentId: string) => `/sub-projects?parentId=${parentId}`,
    BY_ID: (id: string) => `/sub-projects/${id}`,
    CREATE: (parentId: string) => `/sub-projects?parentId=${parentId}`,
    UPDATE: (id: string) => `/sub-projects/${id}`,
    DELETE: (id: string) => `/sub-projects/${id}`,

}
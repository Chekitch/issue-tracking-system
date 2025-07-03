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

export const USERS = {
    ALL: () => `/users`,
    BY_ID: (id: string) => `/users/${id}`,
    CREATE: () =>  `/users`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`
}

export const ROLES = {
    ALL: () => `/roles`,
    CREATE: () => `/roles`,
    UPDATE: (id: number) => `/roles/${id}`,
    DELETE: (id: number) => `/roles/${id}`,
}

export const PERMISSIONS = {
    ALL: () => `/permissions`,
    CREATE: () => `/permissions`,
    UPDATE: (id: number) => `/permissions/${id}`,
    DELETE: (id: number) => `/permissions/${id}`,
    ASSIGN_TO_ROLE: (permissionId: number, roleId: number) => 
        `/roles/${roleId}/permissions/${permissionId}`,
    REMOVE_FROM_ROLE: (permissionId: number, roleId: number) => 
        `/roles/${roleId}/permissions/${permissionId}`,
    BY_ROLE: (roleId: number) => `/roles/${roleId}/permissions`
}
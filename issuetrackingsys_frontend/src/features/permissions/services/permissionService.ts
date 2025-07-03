import axiosInstance from "../../../core/api/axios-config";
import { PERMISSIONS } from "../../../core/api/endpoints";

export interface Permission {
  id: number;
  name: string;
  description: string;
}

export interface CreatePermissionDTO {
  name: string;
  description: string;
}

export const PermissionAPI = {
  getAllPermissions: async (): Promise<Permission[]> => {
    return await axiosInstance.get(PERMISSIONS.ALL());
  },

  createPermission: async (data: CreatePermissionDTO): Promise<Permission> => {
    return await axiosInstance.post(PERMISSIONS.CREATE(), data);
  },
  
  updatePermission: async (id: number, data: Partial<CreatePermissionDTO>): Promise<Permission> => {
    if (id < 0) throw new Error("Permission ID is required");
    return await axiosInstance.put(PERMISSIONS.UPDATE(id), data);
  },
  
  deletePermission: async (id: number): Promise<void> => {
    if (id < 0) throw new Error("Permission ID is required");
    return await axiosInstance.delete(PERMISSIONS.DELETE(id));
  },
  
  assignPermissionToRole: async (permissionId: number, roleId: number): Promise<void> => {
    return await axiosInstance.post(PERMISSIONS.ASSIGN_TO_ROLE(permissionId, roleId));
  },
  
  removePermissionFromRole: async (permissionId: number, roleId: number): Promise<void> => {
    return await axiosInstance.delete(PERMISSIONS.REMOVE_FROM_ROLE(permissionId, roleId));
  },
  
  getPermissionsByRole: async (roleId: number): Promise<Permission[]> => {
    return await axiosInstance.get(PERMISSIONS.BY_ROLE(roleId));
  }
}
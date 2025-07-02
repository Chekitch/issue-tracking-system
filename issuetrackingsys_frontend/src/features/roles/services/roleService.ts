import axiosInstance from "../../../core/api/axios-config";
import { ROLES } from "../../../core/api/endpoints";

export interface UserRole {
  id: number;
  role: string;
  description: string;
}

interface CreateUserRoleDTO {
  role: string;
  description: string;
}

export const RoleAPI = {
  getAllRoles: async (): Promise<UserRole[]> => {
    return await axiosInstance.get(ROLES.ALL());
  },

  createRole: async (data: CreateUserRoleDTO): Promise<UserRole> => {
    return await axiosInstance.post(ROLES.CREATE(), data);
  },
  
  updateRole: async (id: number, data: Partial<CreateUserRoleDTO>): Promise<UserRole> => {
    if (id<0) throw new Error("Role ID is required");
    return await axiosInstance.put(ROLES.UPDATE(id), data);
  },
  
  deleteRole: async (id: number): Promise<void> => {
    if (id<0) throw new Error("Role ID is required");
    return await axiosInstance.delete(ROLES.DELETE(id));
  }
}
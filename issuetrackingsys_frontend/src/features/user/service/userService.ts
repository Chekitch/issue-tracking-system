import axiosInstance from "../../../core/api/axios-config";
import { USERS } from "../../../core/api/endpoints";
import type { UserRole } from "../../roles/services/roleService";


export interface User{
    id: string;
    username: string;
    fullName: string;
    role: UserRole;
}


interface CreateUserDTO{
    username: string;
    fullName: string;
    password: string;
    roleId: number;
}


export const UserAPI = {

    getAllUsers: async () : Promise<User[]> => {

        return await axiosInstance.get(USERS.ALL());
    },

    getUserById: async (id: string) : Promise<User> => {

        if(!id) throw new Error("User ID is required");

        return await axiosInstance.post(USERS.BY_ID(id));
    },

    createUser: async (data: CreateUserDTO) : Promise<User> => {

        return await axiosInstance.post(USERS.CREATE(), data);
    },

    updateUser: async (id: string, data: Partial<CreateUserDTO>) : Promise<User> => {

        if(!id) throw new Error("User ID is required");

        return await axiosInstance.put(USERS.UPDATE(id), data);
    },

    deleteUser: async (id: string) : Promise<void> => {

        if(!id) throw new Error("User ID is required");
    
        return await axiosInstance.delete(USERS.DELETE(id));
    }

}
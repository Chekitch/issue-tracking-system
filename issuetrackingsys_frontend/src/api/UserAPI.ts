import axiosInstance from "../core/api/axios-config.ts";

interface CreateUserDTO {
  username: string;
  fullName: string;
  password: string;
  email: string;
  roleId: string;
}

interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const UserAPI = {
  createUser: async (userData: CreateUserDTO): Promise<UserResponse> => {
    return await axiosInstance.post("/users", userData);
  },
  
  getAllUsers: async (): Promise<UserResponse[]> => {
    return await axiosInstance.get("/users");
  },
  
  getUserById: async (userId: string): Promise<UserResponse> => {
    return await axiosInstance.get(`/users/${userId}`);
  },
  
  updateUser: async (userId: string, userData: Partial<CreateUserDTO>): Promise<UserResponse> => {
    return await axiosInstance.put(`/users/${userId}`, userData);
  },
  
  deleteUser: async (userId: string): Promise<void> => {
    return await axiosInstance.delete(`/users/${userId}`);
  }
};
import axios from "axios";
import { API_BASE_URL } from "../../api/endpoints.ts";


interface LoginResponse {
    token: string;
    username: string;
    authorities: string[];
}

export const LoginAPI = {

    login: async ({ username, password}: {username: string; password: string; }): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_BASE_URL}/auth/login`,
        { username, password }
      );
      return response.data;
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 404) {
        throw new Error(error.response.data.message);
      }
      if (status === 403) {
        throw new Error('Bad Credentials');
      }
      throw error;
    }
  },
}
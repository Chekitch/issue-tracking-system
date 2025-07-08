import axios from "axios";
import {isTokenExpired} from "../auth/utils/tokenUtils.ts";
import {store} from "../../store.tsx";
import {logout} from "../auth/store/authSlice.ts";
import type {ApiResponse, ErrorResponse} from "./types.ts";
import { API_BASE_URL } from "./endpoints.ts";


let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
    authToken = token;
};

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {

        if (authToken) {
            if (isTokenExpired(authToken)) {
                store.dispatch(logout());
                return Promise.reject(new Error('Session is expired'));
            }
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        const wrapper = response.data as ApiResponse<any> | ErrorResponse;
    
        if ('data' in wrapper){
            return wrapper.data;
        }else{
            return Promise.reject(new Error(wrapper.message));
        }
    },
    (error) => {
        console.log(error);
        const eData = error.response?.data as ErrorResponse;
        const msg   = eData?.message || eData?.detail || error.message || "Network error";
        return Promise.reject(new Error(msg));
    }
);

export default axiosInstance;
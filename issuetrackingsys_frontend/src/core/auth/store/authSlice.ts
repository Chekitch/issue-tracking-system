import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {isTokenExpired, parseToken} from "../utils/tokenUtils.ts";

interface AuthState{
    isAuthenticated: boolean;
    token: string | null;
    userId: string | null;
    isExpired: boolean | undefined;
}

const storedToken = localStorage.getItem('token');

const initialState : AuthState = {
    isAuthenticated: !!storedToken,
    token: storedToken,
    userId: storedToken ? parseToken(storedToken) : null,
    isExpired: isTokenExpired(storedToken)
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state, action: PayloadAction<string>){

            const token = action.payload;
            const userId = parseToken(token);
            state.isAuthenticated = true;
            state.token = token;
            state.userId = userId;
            state.isExpired = false;

            localStorage.setItem('token', action.payload);

        },
        logout(state){
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
            state.isExpired = undefined;
            localStorage.removeItem('token');
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
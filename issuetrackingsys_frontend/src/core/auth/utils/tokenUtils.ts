import {jwtDecode} from "jwt-decode";

interface Decoded{
    userId: string;
    exp: number;
}

export const parseToken = (token : string) : string | null => {
    try{
        const decoded = jwtDecode<Decoded>(token);
        return decoded.userId || null;
    }catch{
        return null;
    }
}

export const isTokenExpired = (token : string | null) : boolean | undefined => {
    if (!token) return true;
    try{
        const decoded = jwtDecode<Decoded>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    }catch (error) {
        console.error("Error :", error);
    }
}
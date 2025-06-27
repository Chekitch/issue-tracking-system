import type { ApiResponse, ResponseWrapper } from "../core/api/types";


export function isApiResponse<T>( wrapper : ResponseWrapper<T>): wrapper is ApiResponse<T>{

    return (wrapper as ApiResponse<T>).data !== undefined;
}
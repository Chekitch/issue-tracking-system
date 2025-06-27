export interface ApiResponse<T>{
    data: T;
    message: string;
    statusCode: number;
}

export interface ErrorResponse{
    message: string;
    detail?: string;
    statusCode: number;
}


export type ResponseWrapper<T> = ApiResponse<T> | ErrorResponse;
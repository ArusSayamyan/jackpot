export interface AuthData {
    phone: string,
    password: string;
    confirmPassword?: string
}

export interface RegisterResponseData {
    token: string;
    code: string;
}
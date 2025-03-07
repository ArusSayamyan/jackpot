import { useApi } from "~/composables/useApi";
import type { AuthData, RegisterResponseData, UserData } from "~/api/types";

export const register = async (registerData: AuthData):Promise<RegisterResponseData> => {
    return useApi('api/v1/auth/register', {
        method: "POST",
        body: registerData,
    })
};

export const verify = async (verifyData: RegisterResponseData):Promise<{accessToken: string}> => {
    return useApi('api/v1/Auth/VerifyRegistration', {
        method: "POST",
        body: verifyData,
    })
}

export const login = async (loginData: AuthData):Promise<{accessToken: string}> => {
    return useApi('api/v1/auth/login', {
        method: "POST",
        body: loginData,
    })
}

export const getUser = async (accessToken: string):Promise<UserData> => {
    return useApi('api/v1/user/get', {
        headers: { "Access-Token": accessToken },
    })
}
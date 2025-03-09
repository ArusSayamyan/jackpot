import { useApi } from '~/composables/useApi'
import type { AuthData, RegisterResponseData, UserData } from '~/api/types'

export const register = async (
  registerData: AuthData
): Promise<RegisterResponseData> => {
  return useApi('/auth/register', {
    method: 'POST',
    body: registerData
  })
}

export const verify = async (
  verifyData: RegisterResponseData
): Promise<{ accessToken: string }> => {
  return useApi('/Auth/VerifyRegistration', {
    method: 'POST',
    body: verifyData
  })
}

export const login = async (
  loginData: AuthData
): Promise<{ accessToken: string }> => {
  return useApi('/auth/login', {
    method: 'POST',
    body: loginData
  })
}

export const getUser = async (accessToken: string): Promise<UserData> => {
  return useApi('/user/get', {
    headers: { 'Access-Token': accessToken }
  })
}

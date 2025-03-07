export interface AuthData {
    phone: string,
    password: string;
    confirmPassword?: string
}

export interface RegisterResponseData {
    token: string;
    code: string;
}

interface User {
    id: number,
    userName: string | null,
    firstName: string | null,
    lastName: string | null,
    birthDate: string | null,
    phone: string,
    balance: number,
    operatorID: string | null,
    medias: string | null
}
interface FreeSpin {
    key: string | null,
    quantity: number | null,
    validUntil: string | null
}
export interface UserData  {
    user: () => User,
    freespin: FreeSpin
}
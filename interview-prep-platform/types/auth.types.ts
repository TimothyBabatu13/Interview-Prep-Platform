export interface USER_TYPE { 
    email: string, 
    id: string 
}
export interface DECREPTED_JWT_TYPE {
    userId: string, 
    iat: number, 
    exp: number ,
    jti: string
}

export interface ME_TYPE {
    message: string, 
    data: USER_TYPE
}

export interface LOGIN_TYPE {
    message: string,
    token: string,
    data: USER_TYPE
}
export interface DECREPTED_JWT_TYPE {
    userId: string, 
    iat: number, 
    exp: number 
}

export interface USER_TYPE {
    message: string, 
    data: { 
        email: string, 
        id: string 
    }
}

export interface LOGIN_TYPE {
    message: string,
    token: string,
    data: { 
        email: string, 
        id: string 
    }
}
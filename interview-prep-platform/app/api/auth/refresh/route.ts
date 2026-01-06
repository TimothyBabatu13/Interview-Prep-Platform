import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/constants";
import { decryptToken, encryptToken } from "@/lib/jwt";
import { accessTokenExpireTime } from "@/lib/utils";
import { DECREPTED_JWT_TYPE } from "@/types/auth.types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {

        const refresh_token = req.cookies.get(REFRESH_TOKEN);

        if(!refresh_token) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
        }

        const isTokenValid = decryptToken(refresh_token.value);
        
        if(!isTokenValid){
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
        }
        
        const validatedRefreshToken = isTokenValid as DECREPTED_JWT_TYPE

        const newAccessToken = encryptToken(validatedRefreshToken.userId, '5m');
        const response = NextResponse.json({
            message: "New access token assigned succesfully.",
            token: newAccessToken
        }, { status: 200 });

        response.cookies.set(ACCESS_TOKEN, newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: accessTokenExpireTime()
        }) 
        
        return response
    } catch (error) {
        return NextResponse.json({message: "Unexpected Server Error"}, { status: 500 })
    }
}
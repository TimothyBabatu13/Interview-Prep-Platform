import { ACCESS_TOKEN } from "@/constants/constants";
import { decryptToken } from "@/lib/jwt";
import { createClient } from "@/lib/supabase/server";
import { DECREPTED_JWT_TYPE } from "@/types/auth.types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const access_token = req.cookies.get(ACCESS_TOKEN);
        if(!access_token){
            return NextResponse.json({ message: "Unauthorized access" }, { status : 401 })
        }

        const isTokenValid = decryptToken(access_token.value);

        if(!isTokenValid){
            return NextResponse.json({ message: "Unauthorized access" }, { status : 401 })
        }

        const validatedAccessToken = isTokenValid as DECREPTED_JWT_TYPE;

        const supabase = await createClient();
        const { data: user, error: findUserError } = await supabase
        .from("users")
        .select("email, id")
        .eq("id", validatedAccessToken.userId)
        .single();
        
        if(findUserError || !user){
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json({ message: "Account Details Fetched", data: { email: user?.email, id: user?.id } },{ status: 200 })

    } catch (error) {
        return NextResponse.json({message: "Unexpected Server Error"}, { status: 500 })
    }
}
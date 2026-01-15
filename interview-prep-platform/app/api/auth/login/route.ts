import { ACCESS_TOKEN, REFRESH_TOKEN, REFRESH_TOKEN_MAX_AGE } from "@/constants/constants";
import { verifyPassword } from "@/lib/hash";
import { encryptToken } from "@/lib/jwt";
import { createClient } from "@/lib/supabase/server";
import { ipSigninLimit, userSigninLimit } from "@/lib/upstash/rate-limit";
import { accessTokenExpireTime, calculateTime, formatZodError, getFingerprint } from "@/lib/utils";
import { SignInValidation } from "@/validations/auth";
import { v4 as uuidv4 } from "uuid"; 
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    
    try {
        const body = await req.json();

        const fingerprint = getFingerprint(req);
        const ip =   req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
         
        const ipCheck = await ipSigninLimit.limit(ip);
        
        if (!ipCheck.success) {
            return NextResponse.json(
                { message: `Too many requests from this IP. Reset in ${calculateTime(ipCheck.reset)}`},
                { status: 429 }
            );
        }

        const { success: validationSuccess, data: validationData, error: validationError } = SignInValidation.safeParse(body);

        if(!validationSuccess){
            console.log(validationError)
            const err = formatZodError(validationError);
            return NextResponse.json({message: err}, { status: 400 })
        }

        const { password, email } = validationData;
        
        // const userCheck = await userSigninLimit.limit(`${fingerprint}:${email}`);
        
        // if (!userCheck.success) {
        //     return NextResponse.json(
        //         { message: `Too many attempts for this account. Reset in ${calculateTime(userCheck.reset)}` },
        //         { status: 429 }
        //     );
        // }

        const supabase = await createClient();
        
        const { data: user, error: findUserError } = await supabase
        .from("users")
        .select("email, password_hash, id")
        .eq("email", email)
        .single();
        
        if (!user || findUserError) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const correctPassowrd = await verifyPassword(password, user.password_hash);

        if (!correctPassowrd) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        
        const accessJti = uuidv4();
        const refreshJti = uuidv4();
        
        
        const{ data: storeSessoonData, error: storeSessoonError } =  await supabase.from("active_tokens").insert([
            { jti: accessJti, user_id: user.id, type: "access", expires_at: new Date(Date.now() + 5 * 60 * 1000) },
            { jti: refreshJti, user_id: user.id, type: "refresh", expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
        ]);
        
        const accessToken = encryptToken(user.id, '5m', accessJti);
        const refreshToken = encryptToken(user.id, '7d', refreshJti);

        const response = NextResponse.json({
            message: "Account Login Successfullly",
            token: "logged in",
            data: { email: user?.email, id: user?.id }
        }, { status: 200 });

        response.cookies.set(ACCESS_TOKEN, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: accessTokenExpireTime()
        }) 

        response.cookies.set(REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: REFRESH_TOKEN_MAX_AGE
        }) 

        return response;
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({message: "Unexpected Server error"}, { status: 500 })
    } 
}
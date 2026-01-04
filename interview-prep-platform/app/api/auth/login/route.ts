import { verifyPassword } from "@/lib/hash";
import { decryptAccessToken, encryptAccessToken } from "@/lib/jwt";
import { createClient } from "@/lib/supabase/server";
import { ipSigninLimit, userSigninLimit } from "@/lib/upstash/rate-limit";
import { calculateTime, formatZodError, getFingerprint } from "@/lib/utils";
import { SignInValidation } from "@/validations/auth";
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
        
        const userCheck = await userSigninLimit.limit(`${fingerprint}:${email}`);
        
        if (!userCheck.success) {
            return NextResponse.json(
                { message: `Too many attempts for this account. Reset in ${calculateTime(userCheck.reset)}` },
                { status: 429 }
            );
        }

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

        const accessToken = encryptAccessToken(user.id);
        const refreshToken = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        
        const { error } = await supabase
        .from("sessions")
        .insert([{
            user_id: user.id,
            refresh_token: refreshToken,
            expires_at: expiresAt.toISOString(),
        }]);

        if(error){
            return NextResponse.json({ message: "Failed to create session" }, { status: 500 });
        }
        return NextResponse.json({
            message: "Account Login Successfullly",
            token: accessToken
        }, { status: 200 })

    } catch (error) {
        const err = error as Error;
        return NextResponse.json({message: "Unexpected Server error"}, { status: 500 })
    } 
}
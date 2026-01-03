import { hashPassword } from "@/lib/hash";
import { formatZodError, getFingerprint } from "@/lib/utils";
import { SignUpValidation } from "@/validations/auth";
import { NextRequest, NextResponse } from "next/server"
import { createClient } from '@/lib/supabase/server';
import { ratelimit } from "@/lib/upstash/rate-limit";

const calculateTime = (num: number) => {
    const now = Date.now();
    const diffMs = num - now;
    const diffMinutes = Math.ceil(diffMs / 1000 / 60);
    const readable = `${diffMinutes} minutes remaining`;
    return readable
}

export const POST = async (req: NextRequest) => {
    try {
        const fingerprint = getFingerprint(req);
        
        const body = await req.json();
        const supabase = await createClient()
        const { success: validationSuccess, data, error } = SignUpValidation.safeParse(body);
        if(!validationSuccess){
            const err = formatZodError(error);
            return NextResponse.json({message: err}, { status: 400 })
        }

        const { confirmPassword, password, email } = data;
        if(confirmPassword !== password) {
            return NextResponse.json({message: 'Passwords do not match'}, { status: 400 })
        }
        const identifier = `${fingerprint}:${email}`;
        const { success, remaining, reset } = await ratelimit.limit(identifier);
        console.log(remaining)
        if (!success) {
            return NextResponse.json({ message: `Too many requests. Reset in ${calculateTime(reset)}`},{ status: 429 });
        }

        const { data: existingUser, error: _selectError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

        if(existingUser){
            return NextResponse.json({message: "Email address already registered."}, { status: 409 })
        }

        if (_selectError && _selectError.code !== "PGRST116") { 
            return NextResponse.json({ message: "Database Error" }, { status: 500 });
        }


        const hashedPassword = await hashPassword(password);
        const { data: _newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ email, password_hash: hashedPassword }])
        .select()
        .single()

        if(insertError){
            return NextResponse.json({message: "Failed to create account" }, { status: 500 })
        }
 
        return NextResponse.json({message: 'Account created' }, {status: 201})
    } catch (error) {
        const err = await error as Error;
        return NextResponse.json({message: "Unexpected server error"}, { status: 500 })
    }
    
}
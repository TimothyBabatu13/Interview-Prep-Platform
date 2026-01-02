import { formatZodError } from "@/lib/utils";
import { SignUpValidation } from "@/validations/auth";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { success, data, error } = SignUpValidation.safeParse(body);
        if(!success){
            const err = formatZodError(error);
            return NextResponse.json(err, { status: 400 })
        }

        const { confirmPassword, password, email } = data;
        if(confirmPassword !== password) {
            return NextResponse.json('Passwords do not match', { status: 400 })
        }

        return NextResponse.json('Accouunt created', {status: 201})
    } catch (error) {
        
    }
    
}
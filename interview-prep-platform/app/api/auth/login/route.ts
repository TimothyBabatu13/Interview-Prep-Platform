import { formatZodError } from "@/lib/utils";
import { SignInValidation } from "@/validations/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    
    try {
        const body = await req.json();
        const { success: validationSuccess, data: validationData, error: validationError } = SignInValidation.safeParse(body);

        if(!validationSuccess){
            console.log(validationError)
            const err = formatZodError(validationError);
            console.log(err)
            return NextResponse.json({message: err}, { status: 400 })
        }

        const { password, email } = validationData;
        console.log(password, email);

        return NextResponse.json({message: "Data sent"}, { status: 200 })
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({message: "Server error"}, { status: 500 })
    } 
}
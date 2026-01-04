import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get('authorization');
        console.log(req.headers)
        const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
        console.log(token)
        return NextResponse.json({message: 'got the message'}, { status: 200 })
    } catch (error) {
        return NextResponse.json({message: "Unexpected Server Error"}, { status: 500 })
    }
}
import { NextResponse } from "next/server"
import Groq from "groq-sdk";
import { INTRORUCTION_PROMPT } from "@/constants/prompts";

export const POST = async () => {
    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const speech = await groq.audio.speech.create({
            model: "canopylabs/orpheus-v1-english",
            voice: "hannah",
            input: INTRORUCTION_PROMPT,
            response_format: "wav",
        });
        const buffer = Buffer.from(await speech.arrayBuffer());
        
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "audio/wav",
                "Content-Length": buffer.length.toString(),
            },
        });
    } catch (error) {
        console.log(error);
        const err = error as Error
        return NextResponse.json({message: err.message}, {status: 500})
        
    }
}
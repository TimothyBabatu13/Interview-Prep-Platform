import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/constants/prompts";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file) {
          return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }
        
        const transcription = await groq.audio.transcriptions.create({
            file,
            model: "whisper-large-v3-turbo",
            language: "en",
        });

        const userText = transcription.text;
        console.log(userText)
        const chat = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b", 
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userText }
            ],
            temperature: 0.2,
            max_tokens: 150,
        });

        const aiText = chat.choices[0]?.message?.content ?? "Sorry, no response";

        const speech = await groq.audio.speech.create({
            model: "canopylabs/orpheus-v1-english",
            voice: "hannah",
            input: aiText,
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
        const err = error as Error;
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}
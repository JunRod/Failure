import OpenAI from 'openai';
import {OpenAIStream, StreamingTextResponse} from 'ai';
import {NextResponse} from "next/server";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    baseURL: `https://api.mandrillai.tech/v1`,
});

export const runtime = 'edge'

export async function POST(req: Request) {

    try {
        const {prompt} = await req.json();

        const response = await openai.chat.completions.create({
            model: 'gpt-4-1106-preview',
            stream: true,
            messages: [
                {
                    "role": "user",
                    "content": `${prompt}`
                }
            ]
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error(error);
        if (error instanceof OpenAI.APIError) {
            const {name, status, headers, message} = error;
            return NextResponse.json({name, status, headers, message}, {status});
        } else {
            throw error;
        }
    }
}
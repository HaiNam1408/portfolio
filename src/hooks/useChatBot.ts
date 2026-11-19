import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import * as data from "../assets/data.json";

const API_KEY: string | undefined = import.meta.env.VITE_GEMINI_API_KEY;
// First-word wait measured Nov 2026 from Vietnam, thinking "minimal":
// 3.1-flash-lite 0.8-3.4 s; 3.5-flash-lite ~9 s and often a broken stream ("Incomplete JSON segment").
// 2.5-flash-lite is faster (~0.9 s) but its free tier is only 20 requests/day.
const MODEL = "gemini-3.1-flash-lite";
let client: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `You are Nam's personal assistant. Answer questions about Nam's work, experience, skills, or projects. This is Nam's information: ${JSON.stringify(data)}`;

export function useChatBot() {
    /** Streams the reply, calling onChunk with each new piece of text. Resolves with the full text. */
    const streamResponse = async (message: string, onChunk: (text: string) => void, signal?: AbortSignal) => {
        // Created on first send, not during render: without a key the SDK throws,
        // which used to crash the whole chat panel.
        if (!API_KEY) throw new Error("VITE_GEMINI_API_KEY is not set");
        client ??= new GoogleGenAI({ apiKey: API_KEY });

        const stream = await client.models.generateContentStream({
            model: MODEL,
            contents: message,
            // No thinking: a portfolio Q&A doesn't need it, and it delays the first word.
            config: { systemInstruction: SYSTEM_INSTRUCTION, abortSignal: signal, thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL } },
        });

        let full = "";
        for await (const chunk of stream) {
            if (signal?.aborted) break;
            const piece = chunk.text ?? "";
            if (piece) {
                full += piece;
                onChunk(piece);
            }
        }
        return full;
    };

    return { streamResponse };
}

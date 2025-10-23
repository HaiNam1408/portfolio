import { GoogleGenAI } from "@google/genai";

export function useChatBot() {
    const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

    const SYSTEM_INSTRUCTION = "You are Nam's personal assistant. Answer questions about Nam's work, experience, skills, or projects.";

    const generateResponse = async (message: string) => {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });
        return response;
    };

    return { generateResponse };
}
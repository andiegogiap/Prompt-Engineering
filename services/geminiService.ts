
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";

class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  public startChat(systemInstruction?: string): Chat {
    return this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: systemInstruction ? { systemInstruction } : undefined
    });
  }

  public async generateSvgContent(prompt: string): Promise<string> {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    // The model might wrap the SVG in markdown ```svg block, so we clean it.
    const text = response.text;
    const cleanedText = text.replace(/^```(?:svg)?\n/, '').replace(/\n```$/, '').trim();
    return cleanedText;
  }

  public async generateInference(chatHistory: string): Promise<any> {
    const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on the following conversation, perform an inferential analysis. Extract key insights, create a summary, define actionable items as cards, and generate a brief handover note for the next process or agent. Also generate a simple, self-contained SVG infographic visualizing the key relationships discussed.
        
        Conversation:
        ${chatHistory}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING, description: "A concise summary of the conversation." },
                    handoverNotes: { type: Type.STRING, description: "Notes for the next agent or process, including any action items." },
                    cards: {
                        type: Type.ARRAY,
                        description: "A list of key actionable items or data points, each with a title and content.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                content: { type: Type.STRING }
                            },
                            required: ["title", "content"],
                        }
                    },
                    visualisation: {
                        type: Type.STRING,
                        description: "A self-contained SVG string that visually summarizes the key concepts or workflow discussed."
                    }
                },
                required: ["summary", "handoverNotes", "cards", "visualisation"],
            }
        }
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  }
}

export const geminiService = new GeminiService();

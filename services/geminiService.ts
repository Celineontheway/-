import { GoogleGenAI, Type } from "@google/genai";
import { WisdomData } from "../types";

// Initialize the API client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not set. Using fallback mode.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const fetchMaoWisdom = async (): Promise<WisdomData> => {
  const ai = getAiClient();
  
  if (!ai) {
    throw new Error("API Key missing");
  }

  const prompt = `
    Role: You are the "Book of Answers" based on the Selected Works of Mao Zedong (毛泽东选集).
    
    Context: The user is holding a specific question or dilemma in their mind (unspoken). They are performing a "random page flip" to seek guidance.
    
    Task:
    1. Randomly select a powerful, philosophically significant, and widely applicable quote from the Selected Works of Mao Zedong or his poetry.
    2. The quote should be able to serve as a strategic metaphor for life choices, perseverance, handling contradictions, or assessing situations.
    3. Provide the source (Article title or Poem title).
    4. Provide a brief "Strategic Interpretation" (under 50 words) that translates the revolutionary advice into personal life guidance (e.g., regarding career, relationships, or mental state).
    
    Requirements:
    - All output MUST be in Simplified Chinese (简体中文).
    - The interpretation should be actionable, encouraging, and use dialectical thinking.
    
    Tone: Solemn, inspiring, dialectical, and profound.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING, description: "The direct quote from Mao Zedong in Simplified Chinese." },
            source: { type: Type.STRING, description: "The title of the work in Simplified Chinese." },
            interpretation: { type: Type.STRING, description: "Guidance on how to apply this wisdom to a personal dilemma in Simplified Chinese." },
            keywords: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "2-3 keywords in Simplified Chinese (e.g., '坚持', '辩证')."
            }
          },
          required: ["quote", "source", "interpretation", "keywords"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as WisdomData;

  } catch (error) {
    console.error("Error fetching wisdom:", error);
    throw error;
  }
};
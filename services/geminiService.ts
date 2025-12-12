import { GoogleGenAI } from "@google/genai";
import { DrillResult } from "../types";

const createClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not set in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDrillReport = async (
  scenarioTitle: string,
  results: DrillResult
): Promise<string> => {
  const ai = createClient();
  if (!ai) return "AI Service Unavailable: Missing API Key.";

  const prompt = `
    You are a Cybersecurity Resilience Expert based on the RITE model.
    A user just completed a simulation drill: "${scenarioTitle}".
    
    Performance Metrics:
    - Mean Time to Detect (MTTD): ${results.mttd} minutes
    - Mean Time to Respond (MTTR): ${results.mttr} minutes
    - Decision Effectiveness Score: ${results.decisionScore}/100

    Please provide a concise "After Action Review" (AAR).
    1. Analyze the metrics against industry standards for this attack type.
    2. Provide 3 specific recommendations to improve resilience.
    3. Use professional, military-grade terminology suitable for a CISO report.
    
    Keep it under 150 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Analysis complete, but no text returned.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate AI report due to network or configuration error.";
  }
};

import { GoogleGenAI, Type } from "@google/genai";
import { HealthLog, UserProfile, WellnessRoutine } from "../types";

export const generateWellnessRoutine = async (user: UserProfile, logs: HealthLog[]): Promise<WellnessRoutine> => {
  // Ensure process.env is accessed safely to avoid "process is not defined" errors
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  
  if (!apiKey) {
    throw new Error("Gemini API Key is not configured. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const recentLogs = logs.slice(0, 10);
  const logContext = recentLogs.map(l => `${l.date}: ${l.type} - ${l.value} (${l.note})`).join('\n');

  const prompt = `
    사용자 이름: ${user.name}
    목표: ${user.goal}
    최근 건강 기록:
    ${logContext}

    위 데이터를 기반으로 이 사용자에게 가장 필요한 맞춤형 웰니스 루틴을 1개 생성해주세요.
    운동, 수면, 식단, 멘탈 케어 4가지 영역을 모두 포함해야 합니다.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["category", "description"]
            }
          },
          advice: { type: Type.STRING }
        },
        required: ["title", "activities", "advice"]
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini API");
  }
  
  return JSON.parse(text);
};

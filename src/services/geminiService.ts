import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface FortuneResult {
  overall: string;
  love: string;
  career: string;
  wealth: string;
  luckyColor: string;
  luckyNumber: string;
  summary: string;
}

export const getDailyFortune = async (zodiac: string, birthday: string): Promise<string> => {
  const today = new Date().toLocaleDateString();
  
  const prompt = `
    你是一位精通西方占星术的大师。
    请为生日是 ${birthday}，星座是 ${zodiac} 的用户生成 ${today} 的今日运势。
    
    请包含以下内容：
    1. 整体运势评分（1-5星）
    2. 爱情、事业、财富的简短解读
    3. 今日幸运色和幸运数字
    4. 一句今日寄语
    
    请使用亲切、神秘且富有洞察力的语气。使用 Markdown 格式输出。
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text || "抱歉，星象模糊，请稍后再试。";
};

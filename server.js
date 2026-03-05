import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 开启 CORS 允许我们的 React 前端（通常是 localhost:3000）跨域访问
app.use(cors());
app.use(express.json());

// API 端点处理星座占卜
app.post('/api/fortune', async (req, res) => {
    const { zodiac, birthday } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "API Key (GEMINI_API_KEY) is missing on the server." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
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

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        console.log('DEBUG result:', result);
        const responseText = await result.response.text();
        res.json({ fortune: responseText });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "星象紊乱，请稍后再试。" });
    }
});

app.listen(port, () => {
    console.log(`Backend API starts at http://localhost:${port} [Version 1.1]`);
});

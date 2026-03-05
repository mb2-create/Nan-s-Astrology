import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // 允许跨域请求 (CORS)，以便前端能在开发环境中调用
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 处理预检请求 (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { zodiac, birthday } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "API Key is missing on the server. Please check Vercel Environment Variables." });
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
        const responseText = await result.response.text();
        res.status(200).json({ fortune: responseText });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "星象紊乱，请稍后再试。" });
    }
}

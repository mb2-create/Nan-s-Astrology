export const getDailyFortune = async (zodiac: string, birthday: string): Promise<string> => {
  // 我们不再在前端使用 API Key。此处请求我们自己的后端代理。
  // 本地开发我们通过 Vite Proxy 指向 localhost:3001
  // 在生产环境中，可以根据需要更改 API 地址
  const apiUrl = '/api/fortune';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ zodiac, birthday }),
    });

    if (!response.ok) {
      throw new Error('API server unreachable');
    }

    const data = await response.json();
    return data.fortune || "抱歉，星象模糊，请稍后再试。";
  } catch (error) {
    console.error('Frontend Fetch Error:', error);
    return "星象紊乱，无法窥见天机。请检查网络。";
  }
};

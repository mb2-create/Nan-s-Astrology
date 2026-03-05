
export const getZodiacSign = (date: Date): { name: string; icon: string; symbol: string } | null => {
  if (isNaN(date.getTime())) return null;
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: '白羊座', icon: '♈', symbol: 'Aries' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: '金牛座', icon: '♉', symbol: 'Taurus' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: '双子座', icon: '♊', symbol: 'Gemini' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: '巨蟹座', icon: '♋', symbol: 'Cancer' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: '狮子座', icon: '♌', symbol: 'Leo' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: '处女座', icon: '♍', symbol: 'Virgo' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: '天秤座', icon: '♎', symbol: 'Libra' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: '天蝎座', icon: '♏', symbol: 'Scorpio' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: '射手座', icon: '♐', symbol: 'Sagittarius' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: '摩羯座', icon: '♑', symbol: 'Capricorn' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: '水瓶座', icon: '♒', symbol: 'Aquarius' };
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return { name: '双鱼座', icon: '♓', symbol: 'Pisces' };
  return null;
};

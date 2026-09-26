export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: "تحلیل" | "آموزش" | "راهنما";
  date: string;
  image: string;
  href: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "رمزگشایی از دنیای مرموز Elden Ring",
    excerpt: "نگاهی عمیق به داستان، جهان و رازهایی که هنوز کشف نشده‌اند...",
    category: "تحلیل",
    date: "۱۴۰۳/۰۶/۲۸",
    image: "/images/articles/elden-ring.webp",
    href: "/articles/elden-ring-secrets",
  },
  {
    id: "2",
    title: "۱۰ نکته حرفه‌ای برای شروع در Cyberpunk 2077",
    excerpt: "راهنمای کامل برای تازه‌کارها تا بهترین شروع را در نایت سیتی تجربه کنید...",
    category: "آموزش",
    date: "۱۴۰۳/۰۶/۲۵",
    image: "/images/articles/cyberpunk-2077.webp",
    href: "/articles/cyberpunk-2077-tips",
  },
  {
    id: "3",
    title: "راهنمای کامل God of War Ragnarök",
    excerpt: "همه چیز درباره داستان، شخصیت‌ها، تجهیزات و نکات مخفی بازی...",
    category: "راهنما",
    date: "۱۴۰۳/۰۶/۲۰",
    image: "/images/articles/god-of-war-ragnarok.webp",
    href: "/articles/god-of-war-ragnarok-guide",
  },
];
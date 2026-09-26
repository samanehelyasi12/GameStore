export interface AboutFeature {
  id: string;
  title: string;
  description: string;
}

export const aboutFeatures: AboutFeature[] = [
  {
    id: "love",
    title: "عشق به بازی",
    description: "بازی فقط سرگرمی نیست، یک حساب‌کتابه",
  },
  {
    id: "team",
    title: "تیم حرفه‌ای",
    description: "تلاش برای ارائه بهترین‌ها",
  },
  {
    id: "support",
    title: "همیشه در کنار شما",
    description: "پاسخگو، پشتیبان و همراه",
  },
];

/**
 * Put images at: public/images/about/<id>.webp
 * PNG با پس‌زمینه شفاف پیشنهاد می‌شه (مثل نمونه‌ی فرستاده‌شده).
 */
export const aboutCharacters = [
  { id: "kratos", image: "/images/about/kratos.webp", accent: "border-red-500" },
  { id: "ghost", image: "/images/about/ghost.webp", accent: "border-accent-500" },
  { id: "link", image: "/images/about/link.webp", accent: "border-success" },
];
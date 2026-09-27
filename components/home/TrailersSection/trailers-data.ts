export interface Trailer {
  id: string;
  title: string;
  poster: string; // پوستر بازی — public/images/trailers/<id>.webp
  aparatId: string; // شناسه ویدیو از لینک آپارات (بعد از /v/)
  duration?: string;
}

/**
 * برای گرفتن aparatId از هر لینک آپارات:
 * https://www.aparat.com/v/g43gi5a  →  aparatId: "g43gi5a"
 * فقط همین قسمت بعد از /v/ رو کپی کنید، لینک کامل لازم نیست.
 */
export const trailers: Trailer[] = [
  {
    id: "elden-ring",
    title: "تریلر بررسی بازی Elden Ring",
    poster: "/images/trailers/elden-ring.webp",
    aparatId: "g43gi5a",
    duration: "۳:۴۵",
  },
  {
    id: "god-of-war-ragnarok",
    title: "گیم‌پلی تریلر God of War: Ragnarök",
    poster: "/images/trailers/god-of-war-ragnarok.webp",
    aparatId: "vB9Gb",
    duration: "۴:۱۰",
  },
  {
    id: "red-dead-redemption-2",
    title: "تریلر بازی Red Dead Redemption 2",
    poster: "/images/trailers/red-dead-redemption-2.webp",
    aparatId: "qnle8xi",
    duration: "۲:۰۹",
  },
];

export function aparatEmbedUrl(aparatId: string) {
  return `https://www.aparat.com/video/video/embed/videohash/${aparatId}/vt/frame`;
}
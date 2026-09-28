/**
 * Mock product catalogue (MOCK data — no backend yet).
 * ------------------------------------------------------------------
 * Images only point at files that actually exist in `public/images`
 * (bestsellers + heroes). When the API is connected this file is
 * deleted and every consumer reads from the products endpoint.
 */

export type Product = {
  id: string;
  slug: string;
  title: string;
  /** Toman */
  price: number;
  /** Original price when on sale, otherwise null. */
  compareAtPrice: number | null;
  coverImage: string;
  /** Genre ids — must match the ids in components/layout/Navbar/navbar-data.ts */
  genres: string[];
  platforms: string[];
  /** 0–10 */
  rating: number;
  releaseDate: string;
  shortDescription: string;
  highlights: string[];
};

export const products: Product[] = [
  {
    id: "elden-ring",
    slug: "elden-ring",
    title: "الدن رینگ",
    price: 1299000,
    compareAtPrice: 1599000,
    coverImage: "/images/bestsellers/elden-ring.webp",
    genres: ["rpg", "open-world", "action"],
    platforms: ["PS5", "PS4", "PC"],
    rating: 9.4,
    releaseDate: "۱۴۰۱/۰۲/۳۱",
    shortDescription:
      "در سرزمین‌های میان، طلسم الدن رینگ شکسته شده و شاهزادگان نیمه‌خدا برای نگه‌داری قدرت می‌جنگند.",
    highlights: [
      "بزرگ‌ترین نقشه‌ی بازی تاریخ با بیش از ۱۰۰ ناحیه‌ی کشف‌شدنی",
      "سیستم مبارزه‌ی نقش‌آفرینی با بیش از ۸۰۰ سلاح و زره",
      "پشتیبانی کامل از زبان فارسی (رابط و زیرنویس)",
    ],
  },
  {
    id: "resident-evil-4",
    slug: "resident-evil-4",
    title: "رزیدنت اویل ۴ ریمیک",
    price: 1399000,
    compareAtPrice: null,
    coverImage: "/images/bestsellers/resident-evil-4.webp",
    genres: ["horror", "action", "adventure"],
    platforms: ["PS5", "PC"],
    rating: 9.2,
    releaseDate: "۱۴۰۲/۰۴/۲۰",
    shortDescription:
      "لیون کندی برای نجات دختر رئیس‌جمهور وارد روستایی مه‌آلود در اسپانیا می‌شود؛ جایی که سایه‌های ترس در هر گوشه در انتظارند.",
    highlights: [
      "بازسازی کامل با موتور ری‌میک ورژن ۲",
      "سیستم ترس داینامیک که به سلاح شما واکنش نشان می‌دهد",
      "حالت جدید Separate Ways",
    ],
  },
  {
    id: "red-dead-redemption-2",
    slug: "red-dead-redemption-2",
    title: "رد دد ردمپشن ۲",
    price: 1199000,
    compareAtPrice: 1499000,
    coverImage: "/images/bestsellers/red-dead-redemption-2.webp",
    genres: ["action", "adventure", "open-world"],
    platforms: ["PS4", "PC"],
    rating: 9.5,
    releaseDate: "۱۳۹۷/۱۰/۲۶",
    shortDescription:
      "در آخرین روزهای غرب وحشی، آرتور مورگان بین وفاداری به خانواده و بقای خودش دست‌وپا می‌زند.",
    highlights: [
      "دنیای زنده با تغییر فصل و آب‌وهوا",
      "روایت سینمایی با بازیگران و مکان‌های واقعی",
      "سیستم تعامل و ساختن کمپ",
    ],
  },
  {
    id: "god-of-war-ragnarok",
    slug: "god-of-war-ragnarok",
    title: "گاد آو وار رگناروک",
    price: 1349000,
    compareAtPrice: null,
    coverImage: "/images/bestsellers/god-of-war-ragnarok.webp",
    genres: ["action", "adventure", "fighting"],
    platforms: ["PS5", "PS4"],
    rating: 9.4,
    releaseDate: "۱۴۰۱/۰۹/۲۲",
    shortDescription:
      "کریتوس و آترئوس در آستانه‌ی رگناروک سفری خطرناک را در سرزمین‌های نورس آغاز می‌کنند.",
    highlights: [
      "سیستم مبارزه‌ی ترکیبی چاقو و آریوس",
      "دنیایی قابل‌گشت‌وگذار در ۹ ناحیه",
      "دو بازی گذشته با یک خرید",
    ],
  },
  {
    id: "gta-6",
    slug: "gta-6",
    title: "جی‌تی‌ای ۶",
    price: 1899000,
    compareAtPrice: 2199000,
    coverImage: "/images/bestsellers/gta-6.webp",
    genres: ["action", "open-world", "multiplayer"],
    platforms: ["PS5", "Xbox"],
    rating: 9.1,
    releaseDate: "۱۴۰۴/۰۶/۰۱",
    shortDescription:
      "به لئونیدا خوش آمدید؛ جایی که نئون‌ها هرگز خاموش نمی‌شوند و هیچ‌کس در امان نیست.",
    highlights: [
      "دو شخصیت قابل‌انتخاب با داستان‌های موازی",
      "حالت آنلاین با لاب‌بی چندنفره",
      "رابط فارسی و زیرنویس اختصاصی",
    ],
  },
  {
    id: "devil-may-cry-5",
    slug: "devil-may-cry-5",
    title: "دویل می کرای ۵",
    price: 899000,
    compareAtPrice: 1199000,
    coverImage: "/images/bestsellers/devil-may-cry-5.webp",
    genres: ["action", "fighting"],
    platforms: ["PS5", "PS4", "PC"],
    rating: 9,
    releaseDate: "۱۳۹۹/۰۶/۱۵",
    shortDescription:
      "شهر رد گریو زیر ریشه‌های شیطانی یک درخت هزارساله در حال نابودی است و دانته باید نسل بشر را نجات دهد.",
    highlights: [
      "سیستم مبارزه‌ی سبک با گیم‌پلی فوق‌سریع",
      "بیش از ۲۰ حرکت و بیش از ۱۰۰ سلاح",
      "حالت دوتالی محلی",
    ],
  },
  {
    id: "final-fantasy-7-rebirth",
    slug: "final-fantasy-7-rebirth",
    title: "فاینال فانتزی ۷ ریبرث",
    price: 1599000,
    compareAtPrice: null,
    coverImage: "/images/bestsellers/final-fantasy-7-rebirth.webp",
    genres: ["rpg", "adventure", "multiplayer"],
    platforms: ["PS5", "PC"],
    rating: 9.3,
    releaseDate: "۱۴۰۳/۰۲/۳۰",
    shortDescription:
      "کلود و همراهانش پس از فرار از میدگار، دنیایی گسترده و ناشناخته را برای کشف حقیقت می‌گشکایند.",
    highlights: [
      "سیستم مبارزه‌ی واقع‌گرایانه با زمان‌بندی ضربه",
      "پیشروی همزمان سه شخصیت",
      "دنیایی باز و چندناحیه‌ای",
    ],
  },
  {
    id: "call-of-duty",
    slug: "call-of-duty",
    title: "کالاف دیوتی",
    price: 1699000,
    compareAtPrice: 1999000,
    coverImage: "/images/heroes/ghost.webp",
    genres: ["action", "multiplayer", "adventure"],
    platforms: ["PS5", "Xbox"],
    rating: 8.7,
    releaseDate: "۱۴۰۲/۱۰/۲۸",
    shortDescription:
      "نبردهای سریع و دقیق در جبهه‌های مدرن، از شهرهای ویران تا روستاهای مخفی.",
    highlights: [
      "نقشه‌های چندنفره‌ی ۱۲ نفره",
      "سیستم مهمان و پرستیژ",
      "بازه‌ی بازیکنان کاملاً آزاد",
    ],
  },
  {
    id: "assassins-creed-mirage",
    slug: "assassins-creed-mirage",
    title: "اساسینز کرید میراج",
    price: 1099000,
    compareAtPrice: null,
    coverImage: "/images/heroes/ezio.webp",
    genres: ["action", "adventure", "open-world"],
    platforms: ["PS5", "PS4", "PC"],
    rating: 8.8,
    releaseDate: "۱۴۰۲/۱۰/۰۵",
    shortDescription:
      "بازگشت به بغدادِ سده‌ی نهم، جایی که خنجر از شمشیر سریع‌تر است.",
    highlights: [
      "دنیایی کوچک ولی کاملاً زنده",
      "پارکور آزاد در شهر",
      "مأموریت‌های داستانی سینمایی",
    ],
  },
  {
    id: "mortal-kombat-1",
    slug: "mortal-kombat-1",
    title: "مورتال کامبات ۱",
    price: 1499000,
    compareAtPrice: 1799000,
    coverImage: "/images/heroes/scorpion.webp",
    genres: ["fighting", "action", "multiplayer"],
    platforms: ["PS5", "Xbox"],
    rating: 8.9,
    releaseDate: "۱۴۰۳/۰۱/۱۲",
    shortDescription:
      "آرکاد کلاسیک کمپین به شکلی کاملاً نوسازی‌شده، با مبارزه‌ی ۲.۵ بعدی.",
    highlights: [
      "فیاتالیتی‌های سینمایی با محیط تعاملی",
      "کمپین داستانی به سبک سینمایی",
      "تورنمنت‌های آفلاین و آنلاین",
    ],
  },
  {
    id: "ghost-of-tsushima-director",
    slug: "ghost-of-tsushima-director",
    title: "گاست آف تسوشیما — نسخه‌ی دایرکتور",
    price: 1299000,
    compareAtPrice: null,
    coverImage: "/images/heroes/jin.webp",
    genres: ["action", "adventure", "open-world"],
    platforms: ["PS5", "PS4"],
    rating: 9.2,
    releaseDate: "۱۴۰۰/۰۸/۰۴",
    shortDescription:
      "سایه‌ی سامورای، نبردی برای آزادی جزیره در ژاپنِ اشغال‌شده.",
    highlights: [
      "صدها مأموریت در فضای باز",
      "سامورایی گیم‌پلی و دفاع میدانی",
      "بازسازی تمام‌عیار با گرافیک نسل جدید",
    ],
  },
  {
    id: "crash-bandicoot-4",
    slug: "crash-bandicoot-4",
    title: "کراش باندیکات ۴",
    price: 799000,
    compareAtPrice: 949000,
    coverImage: "/images/heroes/crash.webp",
    genres: ["adventure", "multiplayer", "sports"],
    platforms: ["PS5", "PS4", "Xbox"],
    rating: 8.5,
    releaseDate: "۱۴۰۱/۰۲/۰۴",
    shortDescription:
      "کراش و مکس راهشان را برای نجات اکویوتون آغاز می‌کنند؛ چهار فصل، ده‌ها جهان و کلی طنز.",
    highlights: [
      "ده جهان قابل‌گشت‌وگذار",
      "بازی چهارنفره محلی",
      "سختی قابل‌تنظیم برای همه",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByGenre(genre: string): Product[] {
  return products.filter((p) => p.genres.includes(genre));
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.compareAtPrice !== null);
}

/** Persian genre label lookup — canonical mapping lives in lib/data/genres. */
export { genreLabels, genreLabel } from "@/lib/data/genres";

export type BestSellerItem = {
  id: string;
  title: string;
  genres: string[];
  description: string;
  thumb: string;
  image: string;
  price: number;
  href: string;
};

export const bestSellerItems: BestSellerItem[] = [
  {
    id: "elden-ring",
    title: "الدن رینگ",
    genres: ["نقش‌آفرینی", "اکشن", "جهان باز"],
    description:
      "در سرزمین‌های میان، طلسم الدن رینگ شکسته شده و شاهزادگان نیمه‌خدا برای نگه‌داری قدرت می‌جنگند. سفر خود را آغاز کنید و آینده و سرنوشت سرزمین‌ها را تغییر دهید.",
    thumb: "/images/bestsellers/elden-ring-thumb.webp",
    image: "/images/bestsellers/elden-ring.webp",
    price: 1299000,
    href: "/games/elden-ring",
  },
  {
    id: "resident-evil-4",
    title: "رزیدنت اویل ۴ ریمیک",
    genres: ["ترسناک", "اکشن", "بازمانده"],
    description:
      "لیون کندی برای نجات دختر رئیس‌جمهور وارد روستایی مه‌آلود در اسپانیا می‌شود؛ جایی که سایه‌های ترس در هر گوشه در انتظارند و هر تصمیم می‌تواند آخرین باشد.",
    thumb: "/images/bestsellers/resident-evil-4-thumb.webp",
    image: "/images/bestsellers/resident-evil-4.webp",
    price: 1399000,
    href: "/games/resident-evil-4",
  },
  {
    id: "red-dead-redemption-2",
    title: "رد دد ردمپشن ۲",
    genres: ["ماجراجویی", "اکشن", "جهان باز"],
    description:
      "در آخرین روزهای غرب وحشی، آرتور مورگان بین وفاداری به خانواده‌ی بیرون از قانونش و بقای خودش دست‌وپا می‌زند، در دنیایی وسیع و زنده که هر گوشه‌اش داستانی دارد.",
    thumb: "/images/bestsellers/red-dead-redemption-2-thumb.webp",
    image: "/images/bestsellers/red-dead-redemption-2.webp",
    price: 1199000,
    href: "/games/red-dead-redemption-2",
  },
  {
    id: "god-of-war-ragnarok",
    title: "گاد آو وار رگناروک",
    genres: ["اکشن", "ماجراجویی", "اسطوره‌ای"],
    description:
      "کریتوس و آترئوس در آستانه‌ی رگناروک، برای رویارویی با سرنوشتی که خدایان برایشان رقم زده‌اند، سفری خطرناک را در سرزمین‌های نورس آغاز می‌کنند.",
    thumb: "/images/bestsellers/god-of-war-ragnarok-thumb.webp",
    image: "/images/bestsellers/god-of-war-ragnarok.webp",
    price: 1349000,
    href: "/games/god-of-war-ragnarok",
  },
  {
    id: "gta-6",
    title: "جی‌تی‌ای ۶",
    genres: ["اکشن", "جهان باز", "جنایی"],
    description:
      "به لئونیدا خوش آمدید؛ جایی که نئون‌ها هرگز خاموش نمی‌شوند. داستانی از عشق، جنایت و طمع در دنیایی که همیشه در جریان است و هیچ‌کس در امان نیست.",
    thumb: "/images/bestsellers/gta-6-thumb.webp",
    image: "/images/bestsellers/gta-6.webp",
    price: 1899000,
    href: "/games/gta-6",
  },
  {
    id: "devil-may-cry-5",
    title: "دویل می کرای ۵",
    genres: ["اکشن", "مبارزه", "دیمون"],
    description:
      "شهر رد گریو زیر ریشه‌های شیطانی یک درخت هزارساله در حال نابودی است. دانته، نرو و وی باید دست به دست هم بدهند تا نسل بشر را از فروپاشی نجات دهند.",
    thumb: "/images/bestsellers/devil-may-cry-5-thumb.webp",
    image: "/images/bestsellers/devil-may-cry-5.webp",
    price: 899000,
    href: "/games/devil-may-cry-5",
  },
  {
    id: "final-fantasy-7-rebirth",
    title: "فاینال فانتزی ۷ ریبرث",
    genres: ["نقش‌آفرینی", "ماجراجویی", "داستانی"],
    description:
      "کلود و همراهانش پس از فرار از میدگار، وارد دنیایی گسترده و ناشناخته می‌شوند تا در تعقیب سفیروث، حقیقت گذشته و آینده‌ی سیاره را کشف کنند.",
    thumb: "/images/bestsellers/final-fantasy-7-rebirth-thumb.webp",
    image: "/images/bestsellers/final-fantasy-7-rebirth.webp",
    price: 1599000,
    href: "/games/final-fantasy-7-rebirth",
  },
];

export function formatToman(price: number) {
  return `${price.toLocaleString("fa-IR")} تومان`;
}
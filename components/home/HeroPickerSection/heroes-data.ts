export interface Hero {
  id: string;
  game: string;
  name: string;
  title: string;
  description: string;
  world: string;
  weapon: string;
  style: string;
  firstAppearance: string;
  quote: string;
  image: string; // public/images/heroes/<id>.webp — بدون بک‌گراند
  accent: string; // رنگ گلو/قاب مخصوص این شخصیت
}

/**
 * عکس‌ها را در public/images/heroes/ با همین نام‌ها قرار دهید.
 */
export const heroes: Hero[] = [
  {
    id: "kratos",
    game: "God of War",
    name: "کراتوس",
    title: "خدای جنگ",
    description:
      "مردی که از خشم به قدرت رسید. کراتوس، اسپارتایی که سرنوشت خود را با خون نوشت و از دل تاریکی، مسیر رستنگاری را پیدا کرد. سفری از انتقام تا پدر بودن، داستان مردی که هنوز می‌جنگد.",
    world: "اساطیر نورس",
    weapon: "تبر لویاتان",
    style: "مبارزه نزدیک",
    firstAppearance: "God of War (2005)",
    quote: "گذشته تو را تعریف نمی‌کند... انتخاب‌هایت تو را می‌سازند.",
    image: "/images/heroes/kratos.webp",
    accent: "#e5484d",
  },
  {
    id: "ezio",
    game: "Assassin's Creed",
    name: "ازیو آدیتوره",
    title: "استاد یگان مخفی",
    description:
      "از یک جوان بی‌پروا در فلورانس تا استاد بزرگ یگان مخفی، ازیو سفری طولانی برای انتقام و عدالت پیمود. سایه‌ای در تاریکی که هیچ‌کس صدایش را نمی‌شنود.",
    world: "ایتالیای رنسانس",
    weapon: "تیغه‌ی مخفی",
    style: "پارکور و ترور مخفیانه",
    firstAppearance: "Assassin's Creed II (2009)",
    quote: "هیچ‌چیز درست نیست، همه‌چیز مجاز است.",
    image: "/images/heroes/ezio.webp",
    accent: "#f2555a",
  },
  {
    id: "dante",
    game: "Devil May Cry",
    name: "دانته",
    title: "شکارچی شیاطین",
    description:
      "نیمه‌انسان، نیمه‌دیمون. دانته با شمشیر و دو تپانچه‌اش، بی‌وقفه بین دنیای انسان‌ها و جهنم می‌جنگد تا خانواده‌اش را از سایه‌ی گذشته نجات دهد.",
    world: "دنیای شیاطین",
    weapon: "شمشیر ربلیون و تپانچه‌های ابونی/آیوری",
    style: "اکشن استایلیش",
    firstAppearance: "Devil May Cry (2001)",
    quote: "شیطان همیشه گریه می‌کند.",
    image: "/images/heroes/dante.webp",
    accent: "#c0392b",
  },
  {
    id: "jin",
    game: "Tekken",
    name: "جین کازاما",
    title: "وارث خون شیطانی",
    description:
      "جین در جنگ دائمی با خون شیطانی درون خودش زندگی می‌کند. رزمی‌کاری بی‌نظیر که باید بین انسانیت و قدرت تاریک نهفته در وجودش یکی را انتخاب کند.",
    world: "مسابقات آیرون‌فیست",
    weapon: "مشت و پا",
    style: "کاراته و موشوگی",
    firstAppearance: "Tekken 3 (1997)",
    quote: "قدرت واقعی از درون می‌آید، نه از خشم.",
    image: "/images/heroes/jin.webp",
    accent: "#8b1a1a",
  },
  {
    id: "scorpion",
    game: "Mortal Kombat",
    name: "اسکورپیون",
    title: "روح انتقام‌جو",
    description:
      "هانزو هاسشی، پس از قتل خانواده‌اش، به‌عنوان روحی انتقام‌جو از دنیای مرگ بازگشت. با زنجیر نیزه‌ای مخصوصش، دشمنانش را به سوی خود می‌کشد و فریاد معروفش را سر می‌دهد.",
    world: "قلمرو ارت‌رلم",
    weapon: "نیزه‌ی زنجیری",
    style: "نینجوتسو",
    firstAppearance: "Mortal Kombat (1992)",
    quote: "بیا اینجا!",
    image: "/images/heroes/scorpion.webp",
    accent: "#d4a017",
  },
  {
    id: "crash",
    game: "Crash Bandicoot",
    name: "کراش بندیکوت",
    title: "پاندای مرسوپیال",
    description:
      "کراش با انرژی بی‌پایان و لبخند همیشگی‌اش، بارها جهان را از دست دکتر نئو کورتکس نجات داده. ماجراجویی‌های او مخلوطی از سرعت، چالش و شادی خالص است.",
    world: "جزایر واومبا",
    weapon: "چرخش دورانی",
    style: "پلتفرمر اکشن",
    firstAppearance: "Crash Bandicoot (1996)",
    quote: "وووهوو!",
    image: "/images/heroes/crash.webp",
    accent: "#ff8c00",
  },
  {
    id: "ghost",
    game: "Call of Duty",
    name: "گوست",
    title: "افسر یگان ویژه SAS",
    description:
      "سیمون رایلی، معروف به گوست، همیشه پشت ماسک جمجمه‌اش پنهان می‌ماند. سربازی بی‌صدا و بی‌رحم که در سخت‌ترین ماموریت‌های یگان ویژه هیچ‌وقت شکست را نمی‌پذیرد.",
    world: "عملیات‌های ویژه جهانی",
    weapon: "تفنگ تاکتیکی خاموش‌شده",
    style: "نفوذ و عملیات مخفی",
    firstAppearance: "Call of Duty: Modern Warfare 2 (2009)",
    quote: "مرگ فقط یک چیز دیگر است که باید انجامش داد.",
    image: "/images/heroes/ghost.webp",
    accent: "#4a5d23",
  },
  {
    id: "leon",
    game: "Resident Evil",
    name: "لیون کندی",
    title: "مامور ویژه دولت",
    description:
      "لیون در اولین روز کاریش به‌عنوان پلیس، وارد دنیایی از وحشت و زامبی شد. سالها بعد، او یکی از باتجربه‌ترین مبارزان بر ضد شیوع‌های بیولوژیک در جهان است.",
    world: "شیوع ویروس‌های بیولوژیک",
    weapon: "تپانچه تاکتیکی",
    style: "بازمانده و اکشن",
    firstAppearance: "Resident Evil 2 (1998)",
    quote: "امشب شب مرگ خوبیه که بمیری.",
    image: "/images/heroes/leon.webp",
    accent: "#1a3a5c",
  },
  {
    id: "gta6-duo",
    game: "Grand Theft Auto VI",
    name: "جیسون و لوسیا",
    title: "زوج فراری لئونیدا",
    description:
      "جیسون و لوسیا، دو عاشق فراری در دنیای جنایت و طمع ایالت لئونیدا. آن‌ها برای زنده ماندن باید همه‌چیز را به خطر بیندازند؛ عشقی که در سایه‌ی گلوله‌ها و نئون‌های شهر شکل می‌گیرد.",
    world: "ایالت لئونیدا",
    weapon: "تپانچه‌های نیمه‌اتوماتیک",
    style: "اکشن و جهان باز",
    firstAppearance: "Grand Theft Auto VI (2025)",
    quote: "وایس هرگز نمی‌میرد.",
    image: "/images/heroes/gta6-duo.webp",
    accent: "#ff2d78",
  },
];

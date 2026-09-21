import localFont from "next/font/local";

const mikhak = localFont({
  src: [
    { path: "./fonts/mikhak/Mikhak-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/mikhak/Mikhak-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/mikhak/Mikhak-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/mikhak/Mikhak-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/mikhak/Mikhak-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-mikhak",
});

const fanavari = localFont({
  src: [
    { path: "./fonts/fanavari/Fanavari Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/fanavari/Fanavari Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-fanavari",
});

export const fontVariables = `${mikhak.variable} ${fanavari.variable}`;

export { mikhak, fanavari };
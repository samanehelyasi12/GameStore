import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundFX from "@/components/layout/BackgroundFX";
import {
  siteDescription,
  siteName,
  siteTitle,
  siteTitleTemplate,
  siteUrl,
} from "@/lib/data";
import { ThemeProvider } from "@/lib/theme";
import { CartProvider } from "@/components/cart/CartProvider";
import { OrdersProvider } from "@/components/order/OrdersProvider";
import { fontVariables } from "./fonts";
import "./globals.css";

/**
 * Default social sharing card. Reuses an asset that already ships in
 * `public/` — no new image is introduced by this metadata.
 */
const shareImage = {
  url: "/images/promo/discount-banner.webp",
  width: 1512,
  height: 553,
  alt: `${siteName} — فروشگاه تخصصی بازی، کنسول و لوازم گیمینگ`,
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: siteTitleTemplate,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "خرید بازی",
    "بازی اورجینال",
    "گیم‌استور",
    "PS5",
    "PS4",
    "Xbox",
    "کنسول بازی",
    "خرید کلید بازی",
    "تخفیف بازی",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [shareImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("game-store-theme");if(t!=="dark"&&t!=="light"){t="dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      data-theme="dark"
      suppressHydrationWarning
      className={fontVariables}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <CartProvider>
            <OrdersProvider>
              <BackgroundFX />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </OrdersProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

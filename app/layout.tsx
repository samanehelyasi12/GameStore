import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackgroundFX from "@/components/layout/BackgroundFX";
import { siteName, siteDescription } from "@/lib/data";
import { ThemeProvider } from "@/lib/theme";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
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
          <BackgroundFX />
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
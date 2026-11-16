import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { identity } from "@/lib/content";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata = {
  title: `${identity.name} · ${identity.role}`,
  description: identity.metaDescription,
  openGraph: {
    title: `${identity.name} · ${identity.role}`,
    description: identity.metaDescription,
    type: "website",
    locale: "pt_PT",
  },
};

export const viewport = {
  themeColor: "#17130f",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-PT"
      className={`${bodoni.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca a página como "com JavaScript" antes de pintar, para as revelações não piscarem */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

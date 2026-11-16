import "@fontsource/chakra-petch/500.css";
import "@fontsource/chakra-petch/600.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { identity } from "@/lib/content";

export const metadata = {
  title: `${identity.name} — ${identity.role}`,
  description: identity.tagline,
  openGraph: {
    title: `${identity.name} — ${identity.role}`,
    description: identity.tagline,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#07121b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <body className="scanlines">{children}</body>
    </html>
  );
}

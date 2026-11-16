import Ambient from "@/components/Ambient";
import CursorTag from "@/components/CursorTag";
import { LightboxProvider } from "@/components/Lightbox";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Reel from "@/components/Reel";
import Experience from "@/components/Experience";
import Crafts from "@/components/Crafts";
import Method from "@/components/Method";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <LightboxProvider>
      <Ambient />
      <CursorTag />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Work />
        <Reel />
        <Experience />
        <Crafts />
        <Method />
        <Contact />
      </main>
    </LightboxProvider>
  );
}

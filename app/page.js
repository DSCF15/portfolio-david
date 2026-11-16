import Ambient from "@/components/Ambient";
import CursorTag from "@/components/CursorTag";
import { LightboxProvider } from "@/components/Lightbox";
import { SoundProvider } from "@/components/Sound";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Reel from "@/components/Reel";
import Experience from "@/components/Experience";
import Crafts from "@/components/Crafts";
import Field from "@/components/Field";
import Method from "@/components/Method";
import Contact from "@/components/Contact";

// Ritmo de cores: escuro → creme → escuro → creme → açafrão → escuro → creme → escuro
export default function Home() {
  return (
    <SoundProvider>
      <LightboxProvider>
        <Ambient />
        <CursorTag />
        <Header />
        <main className="relative z-10">
          <Hero />
          <About />
          <Work />
          <Reel />
          <Experience />
          <Crafts />
          <Field />
          <Method />
          <Contact />
        </main>
      </LightboxProvider>
    </SoundProvider>
  );
}

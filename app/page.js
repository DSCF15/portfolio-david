import Ambient from "@/components/Ambient";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Crafts from "@/components/Crafts";
import Method from "@/components/Method";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Ambient />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Work />
        <Experience />
        <Crafts />
        <Method />
        <Contact />
      </main>
    </>
  );
}

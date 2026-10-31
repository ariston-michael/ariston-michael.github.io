import { SiteHeader } from "@/components/SiteHeader";
import { Starfield } from "@/components/Starfield";
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <div id="top" className="site">
      <Starfield />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <FeaturedProjects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import { SiteHeader } from "@/components/SiteHeader";
import { Starfield } from "@/components/Starfield";
import { SolarSystem } from "@/components/SolarSystem";
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
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
        <SolarSystem />
        <FeaturedProjects />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

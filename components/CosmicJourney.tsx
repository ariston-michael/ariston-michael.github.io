import { Hero } from "./Hero";
import { PlanetIllustration } from "./PlanetIllustration";
import { SolarSystem } from "./SolarSystem";

export function CosmicJourney() {
  return (
    <div className="cosmic-journey">
      <div className="journey-backdrop">
        <div className="journey-sky">
          <PlanetIllustration cinematic />
        </div>
      </div>
      <Hero />
      <SolarSystem />
    </div>
  );
}

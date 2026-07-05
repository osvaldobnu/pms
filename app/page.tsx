import { Benefits } from "./components/Benefits";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main>

      <Navbar />

      <Hero />

      <Benefits />

      <HowItWorks />

      <CTA />

      <Footer />
    </main>
  );
}
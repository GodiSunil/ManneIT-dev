import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { TechCreativity } from '@/components/sections/TechCreativity';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { WhyManne } from '@/components/sections/WhyManne';
import { Process } from '@/components/sections/Process';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { CursorGlow } from '@/components/ui/CursorGlow';

export default function App() {
  return (
    <div className="relative min-h-screen bg-obsidian text-ivory">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TechCreativity />
        <Work />
        <About />
        <WhyManne />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { Particles } from '@/components/ui/particles';

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomCursor />
      <Particles className="z-0 opacity-40" count={80} speed={0.3} />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
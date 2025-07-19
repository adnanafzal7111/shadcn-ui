import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { FloatingCodeBackground } from '@/components/ui/floating-code-background';

export default function Hero() {
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (profileRef.current) {
        const { left, top, width, height } = profileRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        
        profileRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = [
    { text: "Hi," },
    { text: "I'm" },
    { text: "Adnan", className: "text-primary" },
    { text: "Afzal" },
  ];

  const roles = [
    { text: "Frontend", className: "text-blue-500" },
    { text: "Developer" },
    { text: "Based", },
    { text: "in", },
    { text: "Lahore,", className: "text-green-500" },
    { text: "Pakistan", className: "text-green-500" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <FloatingCodeBackground />
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="h-16">
                <TypewriterEffect words={words} className="text-4xl md:text-5xl lg:text-6xl font-bold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
                <TypewriterEffect words={roles} className="inline-flex" startDelay={1500} />
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground">
              Building beautiful, interactive, and performant web applications with modern technologies.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button asChild className="group">
                <a href="#projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button variant="outline" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <a 
                href="mailto:adnanafzal7111@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/adnanafzal7111" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/adnan-a-540746254" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div 
              ref={profileRef}
              className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-200 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full">
                  <img 
                   src="./assets/img.jpg" 
                    alt="Adnan Afzal"
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full animate-pulse-slow border-2 border-primary/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
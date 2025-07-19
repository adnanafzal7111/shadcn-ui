import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('#home');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navItems.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(`#${current}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="text-lg md:text-xl font-bold">
            <a href="#home" className="transition-colors hover:text-primary">
              <span className="text-primary">&lt;</span>
              Adnan
              <span className="text-primary">/&gt;</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors hover:text-primary ${
                  activeSection === item.href 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </a>
            ))}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="ml-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Only visible on small screens */}
      <div className="md:hidden px-4 pb-2">
        <nav className="flex justify-center gap-x-1 overflow-x-auto">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`px-3 py-2 text-xs rounded-md whitespace-nowrap transition-colors hover:text-primary ${
                activeSection === item.href 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
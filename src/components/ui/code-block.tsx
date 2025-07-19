"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  animated?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = false,
  animated = false,
}) => {
  const { theme } = useTheme();
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language, theme]);

  return (
    <div className={`relative rounded-lg overflow-hidden ${showLineNumbers ? 'line-numbers' : ''}`}>
      <div className="flex items-center p-3 bg-muted border-b border-muted-foreground/10">
        <div className="flex gap-2 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-75"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-75"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-75"></div>
        </div>
        <div className="mx-auto text-xs text-muted-foreground font-medium">
          {language.toUpperCase()}
        </div>
      </div>
      
      <pre className={`p-4 bg-muted text-sm md:text-base overflow-x-auto ${animated ? 'typewriter' : ''}`}>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
      
      {/* Add typing animation styles */}
      {animated && (
        <style jsx global>{`
          .typewriter code .token {
            opacity: 0;
            animation: fadeIn 0.05s ease-in-out forwards;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .typewriter code .token:nth-child(1) { animation-delay: 0.1s; }
          .typewriter code .token:nth-child(2) { animation-delay: 0.2s; }
          .typewriter code .token:nth-child(3) { animation-delay: 0.3s; }
          .typewriter code .token:nth-child(4) { animation-delay: 0.4s; }
          .typewriter code .token:nth-child(5) { animation-delay: 0.5s; }
          .typewriter code .token:nth-child(6) { animation-delay: 0.6s; }
          .typewriter code .token:nth-child(7) { animation-delay: 0.7s; }
          .typewriter code .token:nth-child(8) { animation-delay: 0.8s; }
          .typewriter code .token:nth-child(9) { animation-delay: 0.9s; }
          .typewriter code .token:nth-child(10) { animation-delay: 1.0s; }
          .typewriter code .token:nth-child(11) { animation-delay: 1.1s; }
          .typewriter code .token:nth-child(12) { animation-delay: 1.2s; }
          .typewriter code .token:nth-child(13) { animation-delay: 1.3s; }
          .typewriter code .token:nth-child(14) { animation-delay: 1.4s; }
          .typewriter code .token:nth-child(15) { animation-delay: 1.5s; }
          .typewriter code .token:nth-child(16) { animation-delay: 1.6s; }
          .typewriter code .token:nth-child(17) { animation-delay: 1.7s; }
          .typewriter code .token:nth-child(18) { animation-delay: 1.8s; }
          .typewriter code .token:nth-child(19) { animation-delay: 1.9s; }
          .typewriter code .token:nth-child(20) { animation-delay: 2.0s; }
        `}</style>
      )}
    </div>
  );
};
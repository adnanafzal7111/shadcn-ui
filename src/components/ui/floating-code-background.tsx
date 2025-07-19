"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type CodeSnippet = {
  content: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotate: number;
  delay: number;
};

// Real code snippets
const codeSnippets = [
  "const App = () => <div>Hello World</div>;",
  "function useToggle(initial = false) {\n  return useState(initial);\n}",
  "import React from 'react';",
  "export default function Button({ children }) {\n  return <button>{children}</button>;\n}",
  "const [count, setCount] = useState(0);",
  "useEffect(() => {\n  // Side effects here\n}, [dependency]);",
  "<div className=\"flex items-center justify-between\">",
  "const theme = useContext(ThemeContext);",
  "const router = useRouter();",
  "const { data } = useSWR('/api/user', fetcher);",
  "const variants = {\n  open: { opacity: 1 },\n  closed: { opacity: 0 },\n};",
  "const filteredItems = items.filter(item => item.active);",
  "const handleSubmit = (e) => {\n  e.preventDefault();\n  // Handle form submission\n}",
];

const generateSnippets = (count: number): CodeSnippet[] => {
  return Array.from({ length: count }, (_, i) => ({
    content: codeSnippets[i % codeSnippets.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.3 + 0.1,
    scale: Math.random() * 0.4 + 0.8,
    rotate: (Math.random() - 0.5) * 10,
    delay: Math.random() * 5,
  }));
};

export const FloatingCodeBackground: React.FC = () => {
  const { theme } = useTheme();
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);

  useEffect(() => {
    setSnippets(generateSnippets(10));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snippets.map((snippet, index) => (
        <motion.div
          key={index}
          className={`absolute font-mono text-xs md:text-sm whitespace-pre p-4 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-muted/20 text-muted-foreground/30 border-muted/30' 
              : 'bg-muted/10 text-muted-foreground/20 border-muted/20'
          }`}
          style={{
            left: `${snippet.x}%`,
            top: `${snippet.y}%`,
            opacity: snippet.opacity,
          }}
          initial={{
            scale: 0.8,
            opacity: 0,
            rotate: snippet.rotate,
          }}
          animate={{
            scale: snippet.scale,
            opacity: snippet.opacity,
            rotate: snippet.rotate,
            y: [0, -15, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 5 + snippet.delay,
              ease: "easeInOut",
            },
            scale: { duration: 1, delay: snippet.delay },
            opacity: { duration: 1, delay: snippet.delay },
          }}
        >
          {snippet.content}
        </motion.div>
      ))}
    </div>
  );
};
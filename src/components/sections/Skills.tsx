import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Code2, 
  Figma, 
  GitBranch, 
  Layers, 
  MessagesSquare,
  Palette
} from 'lucide-react';

const skills = [
  {
    category: "Frontend",
    icon: <Code2 className="h-6 w-6" />,
    items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3"]
  },
  {
    category: "UI Frameworks",
    icon: <Palette className="h-6 w-6" />,
    items: ["MUI", "Tailwind CSS", "Shadcn UI", "Bootstrap"]
  },
  {
    category: "Tools",
    icon: <Layers className="h-6 w-6" />,
    items: ["Git", "GitHub", "VS Code", "npm/yarn/pnpm"]
  },
  {
    category: "Design",
    icon: <Figma className="h-6 w-6" />,
    items: ["Figma", "Responsive Design", "UI/UX Principles"]
  },
  {
    category: "Soft Skills",
    icon: <MessagesSquare className="h-6 w-6" />,
    items: ["Agile Teamwork", "Communication", "Problem Solving", "Time Management"]
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">My Skills</h2>
          <div className="h-1 w-20 bg-primary rounded mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill) => (
            <motion.div 
              key={skill.category}
              className={`
                relative rounded-xl p-6 flex flex-col items-center text-center cursor-pointer
                border border-border transition-all duration-300
                ${selectedCategory === skill.category ? 'bg-primary/10 border-primary/30 shadow-lg' : 'hover:border-primary/30 hover:shadow'}
              `}
              onClick={() => setSelectedCategory(
                selectedCategory === skill.category ? null : skill.category
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                {skill.icon}
              </div>
              <h3 className="font-medium mb-2">{skill.category}</h3>
            </motion.div>
          ))}
        </div>
        
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden"
            >
              <div className="rounded-xl border border-border p-6 bg-card">
                <h4 className="text-xl font-medium mb-4 flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  {selectedCategory} Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.find(s => s.category === selectedCategory)?.items.map((item) => (
                    <motion.span
                      key={item}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium mb-2 inline-flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" />
              All Skills
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {skills.flatMap((category) => 
              category.items.map((item) => (
                <motion.span
                  key={item}
                  className="px-3 py-1 rounded-full bg-card border border-border text-sm hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
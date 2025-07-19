import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Code, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectCarousel } from '@/components/ui/project-carousel';

// Sample projects (replace with real data)
const projects = [
  {
    id: 1,
    title: 'E-Commerce Dashboard',
    description: 'A responsive admin dashboard with dark mode, analytics charts, and product management',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    images: [
      '/assets/images/project1-placeholder1.svg',
      '/assets/images/project1-placeholder2.svg',
      '/assets/images/project1-placeholder3.svg'
    ]
  },
  {
    id: 2,
    title: 'Social Media App',
    description: 'A modern social platform with real-time messaging, post feed, and user profiles',
    tags: ['React', 'TypeScript', 'MUI', 'Firebase'],
    images: [
      '/assets/images/project2-placeholder1.svg',
      '/assets/images/project2-placeholder2.svg'
    ]
  },
  {
    id: 3,
    title: 'Task Management Tool',
    description: 'A Kanban-style project management app with drag-and-drop interface and team collaboration',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'DnD Kit'],
    images: [
      '/assets/images/project3-placeholder1.svg',
      '/assets/images/project3-placeholder2.svg',
      '/assets/images/project3-placeholder3.svg'
    ]
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const constraintsRef = useRef(null);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">My Projects</h2>
          <div className="h-1 w-20 bg-primary rounded mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 30px -15px var(--shadow)" 
              }}
              className="h-full"
            >
              <Card 
                className="overflow-hidden border border-border h-full bg-card relative group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 relative z-10">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              ref={constraintsRef}
              className="w-full max-w-5xl relative"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-border">
                <div className="flex justify-between items-center p-4 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <Code className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">
                      {projects.find(p => p.id === selectedProject)?.title}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-6">
                  <ProjectCarousel 
                    images={projects.find(p => p.id === selectedProject)?.images || []} 
                    alt={projects.find(p => p.id === selectedProject)?.title || "Project"} 
                  />
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-2">Description</h4>
                    <p className="text-muted-foreground mb-4">
                      {projects.find(p => p.id === selectedProject)?.description}
                    </p>
                    
                    <h4 className="text-lg font-medium mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects.find(p => p.id === selectedProject)?.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={() => setSelectedProject(null)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface ProjectCarouselProps {
  images: string[];
  alt: string;
}

export function ProjectCarousel({ images, alt }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (images.length === 0) {
    return <div className="rounded-lg bg-muted h-64 flex items-center justify-center text-muted-foreground">No images available</div>;
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-border">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${alt} - Screenshot ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        
        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background/50 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background/50 to-transparent"></div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <Button 
          variant="secondary" 
          size="icon" 
          className="opacity-80 hover:opacity-100 pointer-events-auto"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        
        <Button 
          variant="secondary" 
          size="icon" 
          className="opacity-80 hover:opacity-100 pointer-events-auto"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
      
      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary scale-125' : 'bg-muted-foreground/30'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Go to image {index + 1}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
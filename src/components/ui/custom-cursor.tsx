"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) setIsVisible(true);
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.tagName === 'BUTTON' || 
                         target.tagName === 'A' || 
                         target.closest('button') || 
                         target.closest('a') ||
                         getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);
  
  if (typeof window === 'undefined') return null;
  
  // Don't render custom cursor on mobile/touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return null;
  
  return (
    <>
      <motion.div
        className={`hidden md:block fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full border border-primary mix-blend-difference ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      <motion.div
        className={`hidden md:block fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 30,
          mass: 0.1,
        }}
      />
      
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        a, button, [role="button"], [data-clickable="true"] {
          cursor: none;
        }
        
        @media (pointer: coarse) {
          body {
            cursor: auto;
          }
          
          a, button, [role="button"], [data-clickable="true"] {
            cursor: pointer;
          }
        }
      `}</style>
    </>
  );
}
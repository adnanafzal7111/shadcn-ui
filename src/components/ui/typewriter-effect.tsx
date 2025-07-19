"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  startDelay = 0,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  startDelay?: number;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
        },
        {
          duration: 0.3,
          delay: stagger(0.1, { startDelay }),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate, startDelay]);

  const renderWords = () => {
    return (
      <div className={cn("inline", className)} ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{ opacity: 0, display: "none" }}
                  key={`char-${index}`}
                  className={cn("inline-block", word.className)}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-8 bg-primary",
            cursorClassName
          )}
        ></motion.span>
      </div>
    );
  };

  return renderWords();
};
'use client';

import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  speed?: number;
  loopDelay?: number;
}

export function AnimatedText({ 
  text, 
  className = '',
  speed = 50,
  loopDelay = 2000 
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    // Reset when text changes (language switch)
    setDisplayText('');
    setIndex(0);
    setIsLooping(false);
  }, [text]);

  useEffect(() => {
    // Typing animation
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (index === text.length && !isLooping) {
      // Text finished typing, wait then restart
      const loopTimer = setTimeout(() => {
        setIsLooping(true);
        setDisplayText('');
        setIndex(0);
      }, loopDelay);

      return () => clearTimeout(loopTimer);
    }
  }, [index, text, speed, loopDelay, isLooping]);

  return (
    <span className={className}>
      {displayText}
      {index < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}

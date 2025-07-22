import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  startDelay?: number;
}

export default function TypingAnimation({ 
  text, 
  speed = 100, 
  startDelay = 1000 
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, speed, startDelay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 750);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="inline-block">
      {displayText}
      <span
        className={`inline-block w-0.5 h-8 bg-primary dark:bg-blue-400 ml-1 ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-150`}
      />
    </span>
  );
}

import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const useTypewriter = ({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: UseTypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startTyping = useCallback(() => {
    setDisplayedText('');
    setIsTyping(true);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (delay > 0 && !isTyping && displayedText === '') {
      timeout = setTimeout(() => {
        startTyping();
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (delay === 0 && !isTyping && displayedText === '') {
      startTyping();
    }
  }, [delay, isTyping, displayedText, startTyping]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, speed, isTyping, onComplete]);

  const reset = useCallback(() => {
    setDisplayedText('');
    setIsTyping(false);
    setIsComplete(false);
  }, []);

  return {
    displayedText,
    isTyping,
    isComplete,
    reset,
    startTyping,
  };
};

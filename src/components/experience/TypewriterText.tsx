import { useTypewriter } from '@/hooks/useTypewriter';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

export const TypewriterText = ({
  text,
  className,
  speed = 50,
  delay = 0,
  showCursor = true,
  onComplete,
}: TypewriterTextProps) => {
  const { displayedText, isTyping, isComplete } = useTypewriter({
    text,
    speed,
    delay,
    onComplete,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('relative', className)}
    >
      <span className="text-romantic">{displayedText}</span>
      
      {showCursor && (isTyping || !isComplete) && (
        <span className="typewriter-cursor" />
      )}
    </motion.div>
  );
};

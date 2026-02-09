import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  delay?: number;
  intensity?: 'gentle' | 'moderate' | 'strong';
}

const sizeClasses = {
  sm: 'w-24 h-24 md:w-32 md:h-32',
  md: 'w-32 h-32 md:w-48 md:h-48',
  lg: 'w-48 h-48 md:w-64 md:h-64',
};

const positionClasses = {
  'top-left': 'top-8 left-8',
  'top-right': 'top-8 right-8',
  'bottom-left': 'bottom-8 left-8',
  'bottom-right': 'bottom-8 right-8',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

const intensityConfig = {
  gentle: { y: [-5, 5, -5], rotate: [-1, 1, -1], duration: 8 },
  moderate: { y: [-10, 10, -10], rotate: [-2, 2, -2], duration: 6 },
  strong: { y: [-15, 15, -15], rotate: [-3, 3, -3], duration: 4 },
};

export const FloatingImage = ({
  src,
  alt,
  className,
  size = 'md',
  position = 'center',
  delay = 0,
  intensity = 'gentle',
}: FloatingImageProps) => {
  const config = intensityConfig[intensity];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
      className={cn(
        'absolute z-10 overflow-hidden rounded-lg shadow-lg',
        sizeClasses[size],
        positionClasses[position],
        className
      )}
    >
      <motion.img
        src={src}
        alt={alt}
        animate={{
          y: config.y,
          rotate: config.rotate,
        }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, hsl(20 8% 15%), hsl(20 8% 8%))';
        }}
      />

      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-lg shadow-[0_0_40px_rgba(212,165,116,0.3)]"
      />
    </motion.div>
  );
};

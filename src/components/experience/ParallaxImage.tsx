import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
}

export const ParallaxImage = ({
  src,
  alt,
  className,
  speed = 0.5,
  overlay = true,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        className
      )}
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ opacity }}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, hsl(20 8% 15%), hsl(20 8% 8%))';
          }}
        />
      </motion.div>

      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.8)_100%)]" />
        </>
      )}
    </div>
  );
};

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLACEHOLDER_IMAGES } from '@/types/experience';

interface ErrorStageProps {
  onComplete: () => void;
}

export const ErrorStage = ({ onComplete }: ErrorStageProps) => {
  const [isFixed, setIsFixed] = useState(false);
  const [rotation, setRotation] = useState(-15);
  const [position, setPosition] = useState({ x: -30, y: 20 });

  const handleFix = () => {
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    
    setTimeout(() => {
      setIsFixed(true);
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <AnimatePresence mode="wait">
          {!isFixed ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-lg text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 font-serif text-2xl md:text-3xl text-foreground"
              >
                Algo parece errado...
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-12 font-serif text-lg italic text-muted-foreground"
              >
                Assim como nos nossos dias difíceis
              </motion.p>

              <div className="relative mx-auto mb-12 h-64 w-64 md:h-80 md:w-80">
                <motion.div
                  animate={{
                    rotate: rotation,
                    x: position.x,
                    y: position.y,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute inset-0 overflow-hidden rounded-xl border-2 border-dashed border-secondary/50"
                >
                  <img
                    src={PLACEHOLDER_IMAGES.error.misaligned}
                    alt="Imperfeição"
                    className="h-full w-full object-cover"
                  />

                  <motion.div
                    animate={{
                      opacity: [0, 0.3, 0, 0.2, 0],
                      x: [0, -5, 5, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute inset-0 bg-secondary/20"
                  />
                </motion.div>

                <div className="absolute inset-0 rounded-xl border-2 border-primary/30 pointer-events-none" />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-8 font-serif text-foreground/80"
              >
                Mas nós sempre encontramos um jeito de alinhar...
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={handleFix}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-primary/50 px-10 py-4 font-serif text-sm uppercase tracking-widest text-foreground transition-all hover:border-primary hover:shadow-[0_0_30px_rgba(212,165,116,0.3)]"
              >
                Alinhar
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="fixed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-lg text-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mx-auto mb-8 h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-xl shadow-[0_0_60px_rgba(212,165,116,0.3)]"
              >
                <img
                  src={PLACEHOLDER_IMAGES.error.corrected}
                  alt="Perfeição"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8 font-serif text-xl italic text-foreground"
              >
                Porque imperfeito, com você, é perfeito.
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={onComplete}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-primary/50 px-10 py-4 font-serif text-sm uppercase tracking-widest text-foreground transition-all hover:border-primary hover:shadow-[0_0_30px_rgba(212,165,116,0.3)]"
              >
                Continuar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

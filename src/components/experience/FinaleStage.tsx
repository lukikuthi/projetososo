import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXTERNAL_LINK } from '@/types/experience';

export const FinaleStage = () => {
  const [showFinalText, setShowFinalText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFinalText(true), 2000);
    const timer2 = setTimeout(() => setShowButton(true), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/projetososo/videos/finale-background.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_100%)]" />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl text-center">
          <AnimatePresence>
            {showFinalText && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                <motion.h1
                  className="mb-6 font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(212,165,116,0)',
                      '0 0 40px rgba(212,165,116,0.3)',
                      '0 0 20px rgba(212,165,116,0)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Eu amo você.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="mb-4 font-serif text-xl italic text-muted-foreground"
                >
                  Não por ser perfeita.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mb-4 font-serif text-xl italic text-muted-foreground"
                >
                  Mas por ser quem você é.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="font-serif text-xl italic text-primary"
                >
                  E isso é mais que extraordinário.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mt-16"
              >
                <motion.a
                  href={EXTERNAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block rounded-full border border-primary/30 px-8 py-3 font-serif text-xs uppercase tracking-widest text-muted-foreground transition-all hover:border-primary hover:text-foreground"
                >
                  Um presente especial
                </motion.a>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8 font-serif text-xs text-muted-foreground/40"
                >
                  Feito com toda a minha paixão ♥
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

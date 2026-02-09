import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import { Particles } from './Particles';

interface IntroductionStageProps {
  onComplete: () => void;
}

const INTRO_TEXTS = [
  "Eu poderia ter escrito uma cartinha",
  "Ou dito pessoalmente...",
  "Mas algumas palavras precisam de mais espaço.",
  "Precisam de silêncio.",
  "Mais esforço.",
  "Então eu construí este lugar.",
  "Para você.",
];

export const IntroductionStage = ({ onComplete }: IntroductionStageProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentTextIndex >= INTRO_TEXTS.length) {
      setTimeout(() => {
        setShowButton(true);
      }, 500);
    }
  }, [currentTextIndex]);

  const handleTextComplete = () => {
    setTimeout(() => {
      if (currentTextIndex < INTRO_TEXTS.length - 1) {
        setCurrentTextIndex(prev => prev + 1);
      } else {
        setShowButton(true);
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden film-grain bg-background">
      <Particles />
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl text-center">
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            {INTRO_TEXTS.slice(0, currentTextIndex + 1).map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index === currentTextIndex ? 1 : 0.4,
                  y: 0,
                  scale: index === currentTextIndex ? 1 : 0.95,
                }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                {index === currentTextIndex ? (
                  <TypewriterText
                    text={text}
                    speed={60}
                    className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground"
                    onComplete={handleTextComplete}
                    showCursor={index === currentTextIndex}
                  />
                ) : (
                  <p className="font-serif text-lg md:text-xl text-muted-foreground">
                    {text}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16"
            >
              <motion.button
                onClick={onComplete}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full border border-primary/50 px-10 py-4 font-serif text-sm uppercase tracking-widest text-foreground transition-all hover:border-primary hover:shadow-[0_0_30px_rgba(212,165,116,0.3)]"
              >
                <motion.span
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Continuar</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

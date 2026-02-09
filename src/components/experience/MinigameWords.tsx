import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingImage } from './FloatingImage';
import { PLACEHOLDER_IMAGES } from '@/types/experience';

interface MinigameWordsProps {
  onComplete: () => void;
}

const CORRECT_PAIRS = [
  { scrambled: 'ROAM', answer: 'AMOR', hint: 'O que sinto por você' },
  { scrambled: 'DASUDEA', answer: 'SAUDADE', hint: 'Quando não estou com você' },
  { scrambled: 'XÃOIAP', answer: 'PAIXÃO', hint: 'O que sinto por você' },
];

export const MinigameWords = ({ onComplete }: MinigameWordsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const currentWord = CORRECT_PAIRS[currentIndex];
  const progress = (currentIndex / CORRECT_PAIRS.length) * 100;

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInput.toUpperCase() === currentWord.answer) {
      if (currentIndex < CORRECT_PAIRS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
        setShowHint(false);
      } else {
        setIsComplete(true);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [userInput, currentWord, currentIndex]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      <FloatingImage
        src={PLACEHOLDER_IMAGES.minigameWords.hint}
        alt="Dica"
        size="sm"
        position="top-right"
        intensity="gentle"
        className="opacity-30"
      />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2 font-serif text-2xl md:text-3xl text-foreground"
              >
                Decifre Meus Sentimentos
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8 font-serif text-sm italic text-muted-foreground"
              >
                Reorganize as letras para descobrir a palavra
              </motion.p>

              <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary"
                  transition={{ duration: 0.5 }}
                />
              </div>

              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <div className="flex justify-center gap-2 mb-4">
                  {currentWord.scrambled.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-card border border-primary/30 font-serif text-xl text-primary shadow-lg"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <form
                onSubmit={handleSubmit}
                className={shake ? 'shake-error' : ''}
              >
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Sua resposta..."
                  className="mb-4 w-full border-0 border-b-2 border-primary/30 bg-transparent px-4 py-3 text-center font-serif text-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                  autoFocus
                />

                <div className="flex flex-col gap-3">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full border border-primary/50 px-6 py-3 font-serif text-sm uppercase tracking-widest text-foreground transition-all hover:border-primary hover:bg-primary/10"
                  >
                    Confirmar
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className="font-serif text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Preciso de uma dica
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 font-serif text-sm italic text-primary/80"
                  >
                    "{currentWord.hint}"
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="reward"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-8 overflow-hidden rounded-xl shadow-[0_0_60px_rgba(212,165,116,0.3)]"
              >
                <img
                  src={PLACEHOLDER_IMAGES.minigameWords.reward}
                  alt="Recompensa"
                  className="w-64 h-64 md:w-80 md:h-80 object-cover"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8 font-serif text-xl italic text-foreground"
              >
                Você conhece o meu tudo.
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

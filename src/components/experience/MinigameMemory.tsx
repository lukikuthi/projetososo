import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLACEHOLDER_IMAGES } from '@/types/experience';

interface MinigameMemoryProps {
  onComplete: () => void;
}

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARD_PAIRS = [
  { content: '♥', pair: 1 },
  { content: '♥', pair: 1 },
  { content: '★', pair: 2 },
  { content: '★', pair: 2 },
  { content: '✿', pair: 3 },
  { content: '✿', pair: 3 },
  { content: '♪', pair: 4 },
  { content: '♪', pair: 4 },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const MinigameMemory = ({ onComplete }: MinigameMemoryProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffledCards = shuffleArray(CARD_PAIRS).map((card, index) => ({
      id: index,
      content: card.content,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setTimeout(() => setIsComplete(true), 500);
    }
  }, [cards]);

  const handleCardClick = useCallback((id: number) => {
    if (isChecking) return;
    if (flippedCards.includes(id)) return;
    if (cards[id].isMatched) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);

      const [first, second] = newFlipped;
      
      setTimeout(() => {
        if (cards[first].content === cards[second].content) {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ));
        } else {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ));
        }
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  }, [cards, flippedCards, isChecking]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

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
                Jogo da Memória
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-2 font-serif text-sm italic text-muted-foreground"
              >
                Encontre os pares que combinam
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8 font-serif text-xs text-muted-foreground/60"
              >
                Movimentos: {moves}
              </motion.p>

              <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative h-16 w-16 rounded-lg transition-all duration-300
                      ${card.isMatched ? 'opacity-50' : 'cursor-pointer'}
                    `}
                    style={{ perspective: '1000px' }}
                  >
                    <motion.div
                      animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="relative h-full w-full"
                    >
                      <div 
                        className="absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/20 backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <span className="text-primary/50 text-xl">?</span>
                      </div>

                      <div 
                        className="absolute inset-0 flex items-center justify-center rounded-lg bg-card border border-primary/50 shadow-lg"
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <span className="text-2xl">{card.content}</span>
                      </div>
                    </motion.div>
                  </motion.button>
                ))}
              </div>
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
                  src={PLACEHOLDER_IMAGES.minigameMemory.reward}
                  alt="Recompensa"
                  className="w-64 h-64 md:w-80 md:h-80 object-cover"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-2 font-serif text-xl italic text-foreground"
              >
                Te lembrar é automático.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-8 font-serif text-sm text-muted-foreground"
              >
                Completou em {moves} movimentos
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

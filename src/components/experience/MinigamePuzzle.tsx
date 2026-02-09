import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { PLACEHOLDER_IMAGES } from '@/types/experience';

interface MinigamePuzzleProps {
  onComplete: () => void;
}

interface PuzzlePiece {
  id: number;
  correctPosition: number;
}

export const MinigamePuzzle = ({ onComplete }: MinigamePuzzleProps) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const initialPieces: PuzzlePiece[] = [
      { id: 0, correctPosition: 0 },
      { id: 1, correctPosition: 1 },
      { id: 2, correctPosition: 2 },
      { id: 3, correctPosition: 3 },
    ];

    const shuffled = [...initialPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
  }, []);

  const checkSolution = useCallback(() => {
    const isCorrect = pieces.every((piece, index) => piece.correctPosition === index);
    if (isCorrect) {
      setIsComplete(true);
    }
  }, [pieces]);

  const handleReorder = (newOrder: PuzzlePiece[]) => {
    setPieces(newOrder);
    setAttempts(prev => prev + 1);
  };

  useEffect(() => {
    if (pieces.length > 0) {
      checkSolution();
    }
  }, [pieces, checkSolution]);

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
                Monte Nossa História
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8 font-serif text-sm italic text-muted-foreground"
              >
                Arraste os pedaços para formar a imagem
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 mx-auto w-32 h-32 overflow-hidden rounded-lg border border-primary/30 opacity-30"
              >
                <img
                  src={PLACEHOLDER_IMAGES.minigamePuzzle.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <Reorder.Group
                axis="y"
                values={pieces}
                onReorder={handleReorder}
                className="space-y-2 max-w-xs mx-auto"
              >
                {pieces.map((piece) => (
                  <Reorder.Item
                    key={piece.id}
                    value={piece}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileDrag={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,165,116,0.4)' }}
                      className="h-20 rounded-lg border border-primary/30 bg-card overflow-hidden"
                    >
                      <div 
                        className="h-full w-full"
                        style={{
                          backgroundImage: `url(${PLACEHOLDER_IMAGES.minigamePuzzle.preview})`,
                          backgroundSize: '100% 400%',
                          backgroundPosition: `0 ${piece.correctPosition * 33.33}%`,
                        }}
                      />
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 font-serif text-xs text-muted-foreground/60"
              >
                Tentativas: {attempts}
              </motion.p>
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
                  src={PLACEHOLDER_IMAGES.minigamePuzzle.reward}
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
                Juntos, formamos algo lindo.
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

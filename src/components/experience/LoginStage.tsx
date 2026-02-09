import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { POETIC_ERRORS } from '@/types/experience';
import { cn } from '@/lib/utils';

interface LoginStageProps {
  onSuccess: () => void;
}

const CORRECT_PASSWORD = 'maravilhosa';

export const LoginStage = ({ onSuccess }: LoginStageProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const randomError = useMemo(() => {
    return POETIC_ERRORS[Math.floor(Math.random() * POETIC_ERRORS.length)];
  }, [error]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      setIsSuccess(true);
      setError(null);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      setIsShaking(true);
      setError(randomError);
      
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  }, [password, onSuccess, randomError]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/projetososo/videos/login-background.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_100%)]" />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full max-w-md text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-2 font-serif text-3xl font-light tracking-wide text-foreground md:text-4xl"
              >
                Para você
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mb-12 font-serif text-lg italic text-muted-foreground"
              >
                que me faz querer escrever
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                onSubmit={handleSubmit}
                className={cn(
                  'transition-transform',
                  isShaking && 'shake-error'
                )}
              >
                <div className="relative mb-6">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Qual é a palavra?"
                    className="w-full border-0 border-b-2 border-primary/30 bg-transparent px-4 py-3 text-center font-serif text-xl text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    autoFocus
                  />
                </div>

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.p
                      key={error}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mb-6 font-serif text-sm italic text-secondary"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-full border border-primary/50 px-8 py-3 font-serif text-sm uppercase tracking-widest text-foreground transition-all hover:border-primary hover:bg-primary/10"
                >
                  <span className="relative z-10">Entrar</span>
                </motion.button>
              </motion.form>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-12 font-serif text-xs text-muted-foreground/50"
              >
                Dica: é algo que você é para mim.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mb-8 text-6xl text-primary"
              >
                ♥
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-serif text-2xl italic text-foreground"
              >
                Você encontrou o caminho...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

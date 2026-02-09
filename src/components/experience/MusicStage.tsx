import { motion } from 'framer-motion';

interface MusicStageProps {
  onComplete: () => void;
}

export const MusicStage = ({ onComplete }: MusicStageProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-4 font-serif text-3xl font-light md:text-4xl text-foreground"
          >
            Essa música me lembra que..
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-12 font-serif text-lg italic text-muted-foreground"
          >
            mesmo no caos, você é a minha paz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-12 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(212,165,116,0.2)]"
          >
            <div className="relative bg-card/80 p-8 text-center">
  <p className="font-serif text-muted-foreground mb-4">
    Solta o play princesa, clica nos três pontos e toca no Spotfy
  </p>

  <iframe
    src="https://open.spotify.com/embed/track/0lPWEt7kSY37pSUIH68ME0?utm_source=generator&theme=0"
    width="100%"
    height="152"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    className="rounded-lg"
  />
</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className="mb-8 font-serif text-lg text-foreground/80">
              "Aperte o play. É aqui que eu fico em silêncio<br/>
              <span className="text-primary">pra sentir você.</span>"
            </p>

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
              <span className="relative z-10">Estou pronta</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

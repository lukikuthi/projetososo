import { AnimatePresence } from 'framer-motion';
import { useExperience } from '@/hooks/useExperience';
import { TransitionOverlay } from './TransitionOverlay';
import { LoginStage } from './LoginStage';
import { IntroductionStage } from './IntroductionStage';
import { MusicStage } from './MusicStage';
import { MinigameWords } from './MinigameWords';
import { MinigameMemory } from './MinigameMemory';
import { MinigamePuzzle } from './MinigamePuzzle';
import { ErrorStage } from './ErrorStage';
import { VulnerabilityStage } from './VulnerabilityStage';
import { FinaleStage } from './FinaleStage';

export const Experience = () => {
  const { 
    currentStage, 
    isTransitioning, 
    nextStage,
    goToStage,
  } = useExperience();

  const renderStage = () => {
    switch (currentStage) {
      case 'login':
        return (
          <LoginStage 
            key="login"
            onSuccess={() => goToStage('introduction')} 
          />
        );
      
      case 'introduction':
        return (
          <IntroductionStage 
            key="introduction"
            onComplete={nextStage} 
          />
        );
      
      case 'music':
        return (
          <MusicStage 
            key="music"
            onComplete={nextStage} 
          />
        );
      
      case 'minigame-words':
        return (
          <MinigameWords 
            key="minigame-words"
            onComplete={nextStage} 
          />
        );
      
      case 'minigame-memory':
        return (
          <MinigameMemory 
            key="minigame-memory"
            onComplete={nextStage} 
          />
        );
      
      case 'minigame-puzzle':
        return (
          <MinigamePuzzle 
            key="minigame-puzzle"
            onComplete={nextStage} 
          />
        );
      
      case 'error':
        return (
          <ErrorStage 
            key="error"
            onComplete={nextStage} 
          />
        );
      
      case 'vulnerability':
        return (
          <VulnerabilityStage 
            key="vulnerability"
            onComplete={nextStage} 
          />
        );
      
      case 'finale':
        return (
          <FinaleStage 
            key="finale"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background film-grain">
      <TransitionOverlay isVisible={isTransitioning} />
      <AnimatePresence mode="wait">
        {renderStage()}
      </AnimatePresence>
    </div>
  );
};

import { useState, useCallback } from 'react';
import { ExperienceStage } from '@/types/experience';

export const useExperience = () => {
  const [currentStage, setCurrentStage] = useState<ExperienceStage>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [completedStages, setCompletedStages] = useState<ExperienceStage[]>([]);

  const goToStage = useCallback((stage: ExperienceStage) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentStage(stage);
      setIsTransitioning(false);
    }, 1000);
  }, []);

  const completeStage = useCallback((stage: ExperienceStage) => {
    if (!completedStages.includes(stage)) {
      setCompletedStages(prev => [...prev, stage]);
    }
  }, [completedStages]);

  const nextStage = useCallback(() => {
    const stageOrder: ExperienceStage[] = [
      'login',
      'introduction',
      'music',
      'minigame-words',
      'minigame-memory',
      'minigame-puzzle',
      'error',
      'vulnerability',
      'finale',
    ];

    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex < stageOrder.length - 1) {
      completeStage(currentStage);
      goToStage(stageOrder[currentIndex + 1]);
    }
  }, [currentStage, goToStage, completeStage]);

  const isStageCompleted = useCallback((stage: ExperienceStage) => {
    return completedStages.includes(stage);
  }, [completedStages]);

  return {
    currentStage,
    isTransitioning,
    completedStages,
    goToStage,
    nextStage,
    completeStage,
    isStageCompleted,
  };
};

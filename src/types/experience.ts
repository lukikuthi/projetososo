export type ExperienceStage = 
  | 'login'
  | 'introduction'
  | 'music'
  | 'minigame-words'
  | 'minigame-memory'
  | 'minigame-puzzle'
  | 'error'
  | 'vulnerability'
  | 'finale';

export interface StageConfig {
  id: ExperienceStage;
  title: string;
  imageCount: number;
}

export const STAGES: StageConfig[] = [
  { id: 'login', title: 'Entrada', imageCount: 1 },
  { id: 'introduction', title: 'Introdução', imageCount: 2 },
  { id: 'music', title: 'Nossa Música', imageCount: 2 },
  { id: 'minigame-words', title: 'Palavras', imageCount: 2 },
  { id: 'minigame-memory', title: 'Memórias', imageCount: 2 },
  { id: 'minigame-puzzle', title: 'Quebra-Cabeça', imageCount: 2 },
  { id: 'error', title: 'Imperfeição', imageCount: 2 },
  { id: 'vulnerability', title: 'Vulnerabilidade', imageCount: 2 },
  { id: 'finale', title: 'Declaração', imageCount: 4 },
];

export const PLACEHOLDER_IMAGES = {
  login: {
    floating: '/projetososo/images/image1.jpeg',
  },
  introduction: {
    parallax: '/projetososo/images/image2.jpeg',
    accent: '/projetososo/images/image3.jpeg',
  },
  music: {
    main: '/projetososo/images/image4.jpeg',
    floating: '/projetososo/images/image5.jpeg',
  },
  minigameWords: {
    reward: '/projetososo/images/image13.jpeg',
    hint: '/projetososo/images/image1.jpeg',
  },
  minigameMemory: {
    reward: '/projetososo/images/image16.jpeg',
    cards: '/projetososo/images/image16.jpeg',
  },
  minigamePuzzle: {
    reward: '/projetososo/images/image7.jpeg',
    preview: '/projetososo/images/image9.jpeg',
  },
  error: {
    misaligned: '/projetososo/images/image5.jpeg',
    corrected: '/projetososo/images/image17.jpeg',
  },
  vulnerability: {
    static: '/projetososo/images/image7.jpeg',
    background: '/projetososo/images/image7.jpeg',
  },
  finale: {
    heart1: '/projetososo/images/image16.jpeg',
    heart2: '/projetososo/images/image17.jpeg',
    heart3: '/projetososo/images/image18.jpeg',
    heart4: '/projetososo/images/image19.jpeg',
  },
};

export const POETIC_ERRORS = [
  "Não é assim que nossa história começa...",
  "Essa não é a palavra que guarda nosso segredo.",
  "Tente novamente. O amor é paciente.",
  "Cada tentativa errada é um passo mais perto...",
  "A resposta está no que fazemos juntos.",
  "Pense no que estou fazendo agora, por você.",
];

export const EXTERNAL_LINK = "https://www.roblox.com/games/127089378849704/Soso-island";

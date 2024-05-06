import { EXPEDITIONS_IMG_URLS } from '@/assets/urls';

const QUEST_FILTERS = {
  LIVE: 'live',
  UPCOMING: 'upcoming',
  PAST: 'past',
};

const QUEST_TYPES = {
  QUIZ: 'quiz',
  LESSON: 'lesson',
  GAME: 'game',
};

const EXPEDITION_TYPES = {
  AI: '346CB272944D1AEE',
  DEV: '834BA9C97958E89A',
  PM: 'ACFBF9F22ED71D53',
  DES: '434E788963CFDA9A',
  DATA: 'C6EAE4923D1FAEFC',
};

const EXPEDITIONS = {
  [EXPEDITION_TYPES.AI]: {
    banner: EXPEDITIONS_IMG_URLS.AI,
    id: EXPEDITION_TYPES.AI,
    name: 'Artifical Intelligence',
  },
  [EXPEDITION_TYPES.DEV]: {
    banner: EXPEDITIONS_IMG_URLS.DEVELOPMENT,
    id: EXPEDITION_TYPES.DEV,
    name: 'Development',
  },
  [EXPEDITION_TYPES.PM]: {
    banner: EXPEDITIONS_IMG_URLS.PROD,
    id: EXPEDITION_TYPES.PM,
    name: 'Product Management',
  },
  [EXPEDITION_TYPES.DES]: {
    banner: EXPEDITIONS_IMG_URLS.DESIGN,
    id: EXPEDITION_TYPES.DES,
    name: 'Design',
  },
};

const DIFFICULTY_LEVELS = {
  ALL: {
    name: 'All Levels',
    id: 'all',
  },
  BEGINNER: {
    name: 'Beginner',
    id: 'beginner',
  },
  INTERMEDIATE: {
    name: 'Intermediate',
    id: 'intermediate',
  },
  ADVANCED: {
    name: 'Advanced',
    id: 'advanced',
  },
};

export {
  QUEST_TYPES,
  QUEST_FILTERS,
  EXPEDITIONS,
  DIFFICULTY_LEVELS,
  EXPEDITION_TYPES,
};

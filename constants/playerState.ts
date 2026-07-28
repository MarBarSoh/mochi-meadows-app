export const PLAYER = {
  name: 'Matthew',
  level: 4,
  xp: 420,
  nextLevelXp: 500,
  currentLevelXp: 350,
  xpProgress: 70 / 150, // (420-350) / (500-350)
  xpToNext: 80,

  stallsDone: 1,
  totalStalls: 3,
  landmarksDone: 0,
  totalLandmarks: 5,
  muralsDone: 0,
  totalMurals: 4,
  shopsDone: 0,
  totalShops: 3,

  accessoriesOwned: 4,
  activitiesStarted: 2,
} as const;

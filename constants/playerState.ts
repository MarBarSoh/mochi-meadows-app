export const PLAYER = {
  name: 'Matthew',
  level: 4,
  xp: 2600,
  nextLevelXp: 3500,
  currentLevelXp: 2200,
  xpProgress: 400 / 1300, // (2600-2200) / (3500-2200)
  xpToNext: 900,

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

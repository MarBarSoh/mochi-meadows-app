export const colors = {
  dark: '#1A1033',
  pink: '#D4708A',
  lpink: '#FFB5C5',
  white: '#FFFFFF',
  grey: '#555555',
  lgrey: '#888888',

  blue: {
    dark: '#0C447C',
    mid: '#185FA5',
    bg: '#EBF4FF',
    light: '#B5D4F4',
  },
  amber: {
    dark: '#412402',
    mid: '#BA7517',
    bg: '#FFF9EE',
    light: '#FAD090',
  },
  purple: {
    dark: '#26215C',
    mid: '#534AB7',
    bg: '#F5F0FF',
    light: '#C0AAEE',
  },
  teal: {
    dark: '#04342C',
    mid: '#0F6E56',
    bg: '#EDFFF6',
    light: '#88DDBB',
  },
} as const;

export const activityColors = {
  'Time Travelling': colors.blue,
  'Bring Back the Food': colors.amber,
  'Recreate the Art': colors.purple,
  'Meet the Maker': colors.teal,
} as const;

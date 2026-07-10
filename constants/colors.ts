export const colors = {
  dark:  '#C8EBF5',
  white: '#FFFFFF',
  text:  '#1B3D0E',

  pink:  '#5CB83A',
  lpink: '#2D7A18',

  grey:  '#4A7A2A',
  lgrey: '#7AAA40',

  blue:   { dark: '#0C447C', mid: '#185FA5', bg: '#EBF4FF', light: '#B5D4F4' },
  amber:  { dark: '#412402', mid: '#BA7517', bg: '#FFF9EE', light: '#FAD090' },
  purple: { dark: '#26215C', mid: '#534AB7', bg: '#F5F0FF', light: '#C0AAEE' },
  teal:   { dark: '#04342C', mid: '#0F6E56', bg: '#EDFFF6', light: '#88DDBB' },
} as const;

export const activityColors = {
  'Time Travelling': colors.blue,
  'Bring Back the Food': colors.amber,
  'Recreate the Art': colors.purple,
  'Meet the Maker': colors.teal,
} as const;

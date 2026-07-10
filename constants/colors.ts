export const colors = {
  dark:  '#FDF6EC',        // warm cream background
  white: '#FFFFFF',
  text:  '#3A2008',        // dark warm brown

  pink:  '#E8721A',        // orange accent
  lpink: '#8B5E30',        // dark brown label

  grey:  '#A07848',        // warm mid brown
  lgrey: '#C4A882',        // light warm brown / muted text

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

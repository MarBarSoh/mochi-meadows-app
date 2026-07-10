import { View, Text, StyleSheet } from 'react-native';

interface Props {
  height?: number;
}

export default function GoogleMap({ height = 200 }: Props) {
  return (
    <View style={[styles.placeholder, { height }]}>
      <Text style={styles.text}>📍 Jalan Besar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#2D1F4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
});

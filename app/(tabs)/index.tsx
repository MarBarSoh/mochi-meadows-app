import { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PLAYER } from '@/constants/playerState';

const meadow = require('../../assets/images/meadow.png');

function useSpringPress(toScale = 0.96) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () =>
    Animated.spring(scale, { toValue: toScale, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 12 }).start();
  return { scale, pressIn, pressOut };
}

const ACTIVITIES = [
  { id: 'time', label: 'TIME TRAVEL' },
  { id: 'food', label: 'BRING BACK THE FOOD' },
  { id: 'art', label: 'ART RECREATION' },
  { id: 'maker', label: 'MEET THE MAKER' },
];

function ActivityBtn({ label, onPress }: { label: string; onPress: () => void }) {
  const spring = useSpringPress(0.96);
  return (
    <Animated.View style={{ transform: [{ scale: spring.scale }], marginBottom: 10 }}>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={1}
        onPressIn={spring.pressIn}
        onPressOut={spring.pressOut}
        onPress={onPress}
      >
        <Text style={styles.btnText}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function ProfileChip() {
  return (
    <View style={styles.profileChip}>
      <Text style={styles.profileName}>{PLAYER.name}</Text>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarIcon}>👤</Text>
      </View>
    </View>
  );
}

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={meadow} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Top-right profile chip */}
        <View style={styles.topRow}>
          <ProfileChip />
        </View>

        {/* Orange bold italic title */}
        <View style={styles.titleArea}>
          <Text style={styles.titleShadow}>SEND YOUR{'\n'}MOCCHI ON AN{'\n'}ADVENTURE!</Text>
          <Text style={styles.title}>SEND YOUR{'\n'}MOCCHI ON AN{'\n'}ADVENTURE!</Text>
        </View>

        {/* 4 big activity buttons */}
        <View style={styles.btnsArea}>
          {ACTIVITIES.map(act => (
            <ActivityBtn
              key={act.id}
              label={act.label}
              onPress={() => router.push(`/activity/${act.id}` as any)}
            />
          ))}
        </View>

        <View style={{ flex: 1 }} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  topRow: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  profileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#1A0A00',
  },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1A0A00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: { fontSize: 16 },

  titleArea: {
    paddingHorizontal: 20,
    marginTop: 14,
    marginBottom: 6,
    position: 'relative',
  },
  titleShadow: {
    position: 'absolute',
    left: 23,
    top: 3,
    fontSize: 36,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#4A2000',
    lineHeight: 42,
    zIndex: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FF8C00',
    lineHeight: 42,
    zIndex: 1,
  },

  btnsArea: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#FFFEF8',
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#2A1A00',
    borderBottomWidth: 8,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  btnText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#1A0A00',
    letterSpacing: 0.5,
  },
});

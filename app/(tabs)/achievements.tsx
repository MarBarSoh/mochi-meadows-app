import { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';

const FOOD_TRAIL = [
  { name: 'Swee Choon Dim Sum', est: 'Est. 1962', emoji: '🥟', done: true, reward: 'First Stamp' },
  { name: 'Sungei Road Laksa', est: 'Heritage stall', emoji: '🍜', done: false, reward: 'Second Stamp' },
  { name: 'Beach Road Curry Rice', est: 'Jalan Besar classic', emoji: '🍛', done: false, reward: 'CDC Voucher 🎟️' },
];

const TIME_TRAIL = [
  { name: 'Jalan Besar Stadium', emoji: '🏟️', done: false },
  { name: 'Former SCGS Building', emoji: '🏫', done: false },
  { name: 'Rochor Centre', emoji: '🏙️', done: false },
  { name: 'Petain Road Shophouses', emoji: '🏠', done: false },
  { name: 'Jalan Besar FC Mural', emoji: '⚽', done: false },
];

const MURAL_TRAIL = [
  { name: 'Jalan Besar\nFC Mural', emoji: '⚽', done: false, address: 'Tyrwhitt Rd' },
  { name: 'Heritage\nTrades Mural', emoji: '🔨', done: false, address: 'Short Street' },
  { name: 'Peranakan\nMural', emoji: '🌺', done: false, address: 'Petain Road' },
  { name: 'Hawker\nHeritage Mural', emoji: '🍜', done: false, address: 'Jalan Besar' },
];

const MAKER_TRAIL = [
  { name: 'Rad Son\nLighting', emoji: '💡', done: false, est: 'Est. 2006' },
  { name: 'Heritage\nHardware', emoji: '🔩', done: false, est: 'Jalan Besar' },
  { name: 'Rattan\nWorkshop', emoji: '🧺', done: false, est: 'Traditional' },
];

export default function AchievementsScreen() {
  const router = useRouter();
  const ctaScale = useRef(new Animated.Value(1)).current;
  const ctaPressIn = () =>
    Animated.spring(ctaScale, { toValue: 0.94, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  const ctaPressOut = () =>
    Animated.spring(ctaScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 14 }).start();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSub}>YOUR PROGRESS</Text>
          <Text style={styles.headerTitle}>Trail Book</Text>
        </View>

        {/* Overall progress */}
        <View style={styles.overallCard}>
          <Text style={styles.overallLabel}>MEADOW PROGRESS</Text>
          <View style={styles.overallRow}>
            <View style={styles.overallStat}>
              <Text style={styles.overallNum}>1</Text>
              <Text style={styles.overallStatLabel}>Stalls Visited</Text>
            </View>
            <View style={styles.overallDivider} />
            <View style={styles.overallStat}>
              <Text style={styles.overallNum}>0</Text>
              <Text style={styles.overallStatLabel}>Landmarks Found</Text>
            </View>
            <View style={styles.overallDivider} />
            <View style={styles.overallStat}>
              <Text style={styles.overallNum}>LV 1</Text>
              <Text style={styles.overallStatLabel}>Meadow Level</Text>
            </View>
          </View>
        </View>

        {/* Food Trail — HERO */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>🍜 FOOD TRAIL</Text>
            <View style={[styles.sectionBadge, { backgroundColor: colors.amber.light }]}>
              <Text style={[styles.sectionBadgeText, { color: colors.amber.dark }]}>1/3 DONE</Text>
            </View>
          </View>

          <View style={[styles.trailCard, { borderColor: colors.amber.light, backgroundColor: colors.amber.bg }]}>
            <View style={styles.trailRewardRow}>
              <Text style={styles.trailRewardEmoji}>🎟️</Text>
              <View>
                <Text style={[styles.trailRewardLabel, { color: colors.amber.dark }]}>FINAL REWARD</Text>
                <Text style={[styles.trailRewardValue, { color: colors.amber.mid }]}>CDC Voucher</Text>
              </View>
              <View style={styles.trailProgress}>
                <Text style={[styles.trailProgressNum, { color: colors.amber.mid }]}>1/3</Text>
              </View>
            </View>

            <View style={styles.trailProgressBar}>
              <View
                style={[
                  styles.trailProgressFill,
                  { width: '33%', backgroundColor: colors.amber.mid },
                ]}
              />
            </View>

            {FOOD_TRAIL.map((item, i) => (
              <View key={item.name} style={styles.trailItem}>
                <View style={[styles.trailDot, item.done && { backgroundColor: colors.amber.mid }]}>
                  {item.done && <Text style={styles.trailDotCheck}>✓</Text>}
                </View>
                {i < FOOD_TRAIL.length - 1 && (
                  <View
                    style={[styles.trailLine, { backgroundColor: item.done ? colors.amber.mid : colors.amber.light }]}
                  />
                )}
                <View style={styles.trailItemContent}>
                  <Text style={styles.trailItemEmoji}>{item.emoji}</Text>
                  <View style={styles.trailItemText}>
                    <Text style={[styles.trailItemName, { color: colors.amber.dark }]}>{item.name}</Text>
                    <Text style={[styles.trailItemSub, { color: colors.amber.mid }]}>{item.est}</Text>
                  </View>
                  {!item.done && (
                    <View style={[styles.rewardChip, { backgroundColor: colors.amber.light }]}>
                      <Text style={[styles.rewardChipText, { color: colors.amber.dark }]}>{item.reward}</Text>
                    </View>
                  )}
                  {item.done && (
                    <Text style={styles.doneChip}>✅ Done</Text>
                  )}
                </View>
              </View>
            ))}

            <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
              <TouchableOpacity
                style={[styles.trailCTA, { backgroundColor: colors.amber.mid }]}
                activeOpacity={1}
                onPressIn={ctaPressIn}
                onPressOut={ctaPressOut}
                onPress={() => router.push('/activity/food')}
              >
                <Text style={styles.trailCTAText}>Continue Food Trail →</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* Time Travelling */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>📸 TIME TRAVELLING</Text>
            <View style={[styles.sectionBadge, { backgroundColor: colors.blue.light }]}>
              <Text style={[styles.sectionBadgeText, { color: colors.blue.dark }]}>0/5 DONE</Text>
            </View>
          </View>
          <View style={[styles.trailCard, { borderColor: colors.blue.light, backgroundColor: colors.blue.bg }]}>
            <View style={styles.timeGrid}>
              {TIME_TRAIL.map((item) => (
                <View key={item.name} style={styles.timeItem}>
                  <View style={[styles.timeItemIcon, { backgroundColor: colors.blue.light }]}>
                    <Text style={styles.timeItemEmoji}>{item.emoji}</Text>
                  </View>
                  <Text style={[styles.timeItemName, { color: colors.blue.dark }]}>{item.name}</Text>
                  <View style={[styles.timeItemStatus, { backgroundColor: colors.blue.light }]}>
                    <Text style={[styles.timeItemStatusText, { color: colors.blue.mid }]}>Locked</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recreate the Art */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>🎨 RECREATE THE ART</Text>
            <View style={[styles.sectionBadge, { backgroundColor: colors.purple.light }]}>
              <Text style={[styles.sectionBadgeText, { color: colors.purple.dark }]}>0/4 DONE</Text>
            </View>
          </View>
          <View style={[styles.trailCard, { borderColor: colors.purple.light, backgroundColor: colors.purple.bg }]}>
            <View style={styles.sectionDesc}>
              <Text style={[styles.sectionDescText, { color: colors.purple.dark }]}>
                Find street murals and photograph your Mochi at each one
              </Text>
            </View>
            <View style={styles.timeGrid}>
              {MURAL_TRAIL.map((item) => (
                <View key={item.name} style={styles.timeItem}>
                  <View style={[styles.timeItemIcon, { backgroundColor: colors.purple.light }]}>
                    <Text style={styles.timeItemEmoji}>{item.emoji}</Text>
                  </View>
                  <Text style={[styles.timeItemName, { color: colors.purple.dark }]}>{item.name}</Text>
                  <Text style={[styles.timeItemAddress, { color: colors.purple.mid }]}>{item.address}</Text>
                  <View style={[styles.timeItemStatus, { backgroundColor: colors.purple.light }]}>
                    <Text style={[styles.timeItemStatusText, { color: colors.purple.mid }]}>Not started</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Meet the Maker */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>🔧 MEET THE MAKER</Text>
            <View style={[styles.sectionBadge, { backgroundColor: colors.teal.light }]}>
              <Text style={[styles.sectionBadgeText, { color: colors.teal.dark }]}>0/3 DONE</Text>
            </View>
          </View>
          <View style={[styles.trailCard, { borderColor: colors.teal.light, backgroundColor: colors.teal.bg }]}>
            <View style={styles.sectionDesc}>
              <Text style={[styles.sectionDescText, { color: colors.teal.dark }]}>
                Visit traditional trade shops and discover their stories
              </Text>
            </View>
            <View style={styles.timeGrid}>
              {MAKER_TRAIL.map((item) => (
                <View key={item.name} style={styles.timeItem}>
                  <View style={[styles.timeItemIcon, { backgroundColor: colors.teal.light }]}>
                    <Text style={styles.timeItemEmoji}>{item.emoji}</Text>
                  </View>
                  <Text style={[styles.timeItemName, { color: colors.teal.dark }]}>{item.name}</Text>
                  <Text style={[styles.timeItemAddress, { color: colors.teal.mid }]}>{item.est}</Text>
                  <View style={[styles.timeItemStatus, { backgroundColor: colors.teal.light }]}>
                    <Text style={[styles.timeItemStatusText, { color: colors.teal.mid }]}>Not visited</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 16 },

  header: { marginBottom: 20, paddingTop: 8 },
  headerSub: { fontSize: 10, color: colors.lpink, letterSpacing: 2, fontWeight: '700' },
  headerTitle: { fontSize: 26, color: colors.text, fontWeight: '800', letterSpacing: -0.5 },

  overallCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  overallLabel: { fontSize: 9, color: colors.lpink, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 },
  overallRow: { flexDirection: 'row', alignItems: 'center' },
  overallStat: { flex: 1, alignItems: 'center' },
  overallNum: { fontSize: 24, color: colors.text, fontWeight: '800' },
  overallStatLabel: { fontSize: 10, color: colors.lgrey, marginTop: 2, textAlign: 'center' },
  overallDivider: { width: 1, height: 40, backgroundColor: 'rgba(0,0,0,0.1)' },

  section: { marginBottom: 24 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionLabel: { fontSize: 11, color: colors.lpink, letterSpacing: 2, fontWeight: '700' },
  sectionBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  sectionBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },

  trailCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 3,
    borderBottomWidth: 6,
  },
  trailRewardRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  trailRewardEmoji: { fontSize: 28 },
  trailRewardLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 1, opacity: 0.7 },
  trailRewardValue: { fontSize: 15, fontWeight: '800' },
  trailProgress: { marginLeft: 'auto' },
  trailProgressNum: { fontSize: 18, fontWeight: '800' },

  trailProgressBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  trailProgressFill: { height: '100%', borderRadius: 3 },

  trailItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, position: 'relative' },
  trailDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
    flexShrink: 0,
  },
  trailDotCheck: { fontSize: 11, color: colors.white, fontWeight: '800' },
  trailLine: {
    position: 'absolute',
    left: 10,
    top: 24,
    width: 2,
    height: 20,
  },
  trailItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 12,
  },
  trailItemEmoji: { fontSize: 20 },
  trailItemText: { flex: 1 },
  trailItemName: { fontSize: 13, fontWeight: '700' },
  trailItemSub: { fontSize: 11, opacity: 0.7, marginTop: 1 },
  rewardChip: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  rewardChipText: { fontSize: 10, fontWeight: '700' },
  doneChip: { fontSize: 12, fontWeight: '700', color: '#22c55e' },

  trailCTA: {
    backgroundColor: '#FFFEF8',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#6B4020',
    borderBottomWidth: 7,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  trailCTAText: { color: '#3A2008', fontWeight: '900', fontSize: 15, letterSpacing: 0.3 },

  sectionDesc: { marginBottom: 12 },
  sectionDescText: { fontSize: 12, fontStyle: 'italic', opacity: 0.8, lineHeight: 17 },

  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeItem: { width: '22%', alignItems: 'center', gap: 5 },
  timeItemIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  timeItemEmoji: { fontSize: 22 },
  timeItemName: { fontSize: 9, fontWeight: '700', textAlign: 'center', lineHeight: 12 },
  timeItemAddress: { fontSize: 8, textAlign: 'center', opacity: 0.7 },
  timeItemStatus: { borderRadius: 6, paddingHorizontal: 5, paddingVertical: 2 },
  timeItemStatusText: { fontSize: 8, fontWeight: '700' },
});

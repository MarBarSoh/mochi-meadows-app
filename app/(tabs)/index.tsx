import { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { PLAYER } from '@/constants/playerState';
import MochiCharacter, { AccessoryId } from '@/components/MochiCharacter';
import GoogleMap from '@/components/GoogleMap';

function useSpringPress(toScale = 0.96) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () =>
    Animated.spring(scale, { toValue: toScale, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 12 }).start();
  return { scale, pressIn, pressOut };
}

const ACTIVITIES = [
  {
    id: 'food',
    name: 'Bring Back\nthe Food',
    shortName: 'Food Trail',
    emoji: '🍜',
    mochi: 'bow' as AccessoryId,
    color: colors.amber,
    progress: 1,
    total: 3,
    reward: 'Food Accessories',
    rewardEmoji: '🍞',
    description: 'Group of 4+ · visit 3 heritage stalls\n& scan QR after purchase',
    tag: 'FOOD TRAIL',
  },
  {
    id: 'time',
    name: 'Time\nTravelling',
    shortName: 'Time Travel',
    emoji: '📸',
    mochi: 'cap' as AccessoryId,
    color: colors.blue,
    progress: 0,
    total: 5,
    reward: 'Kapitan Cap + CDC Voucher',
    rewardEmoji: '🎟️',
    description: 'Match archival photos to real landmarks\n— unlock a CDC Voucher',
    tag: 'PHOTO HUNT',
  },
  {
    id: 'art',
    name: 'Recreate\nthe Art',
    shortName: 'Mural Art',
    emoji: '🎨',
    mochi: 'beret' as AccessoryId,
    color: colors.purple,
    progress: 0,
    total: 4,
    reward: 'Artist Beret + Paint Palette',
    rewardEmoji: '🎨',
    description: 'Snap Mochi at murals in AR · submit to\ncommunity gallery for votes & XP',
    tag: 'AR CAMERA + GALLERY',
  },
  {
    id: 'maker',
    name: 'Meet the\nMaker',
    shortName: 'Meet Maker',
    emoji: '🔧',
    mochi: 'hardhat' as AccessoryId,
    color: colors.teal,
    progress: 0,
    total: 3,
    reward: 'Rattan Bag + Toolbelt',
    rewardEmoji: '🪖',
    description: 'Visit trade shops · race friends in\na Kahoot-style heritage quiz',
    tag: 'QUIZ + SHOP VISIT',
  },
];


function ActivityCard({ act, onPress }: { act: typeof ACTIVITIES[number]; onPress: () => void }) {
  const spring = useSpringPress(0.96);
  return (
    <Animated.View style={{ transform: [{ scale: spring.scale }], marginBottom: 12 }}>
      <TouchableOpacity
        style={styles.activityBtn}
        activeOpacity={1}
        onPressIn={spring.pressIn}
        onPressOut={spring.pressOut}
        onPress={onPress}
      >
        <View style={[styles.actBtnIconCircle, { backgroundColor: act.color.light }]}>
          <Text style={styles.actBtnEmoji}>{act.emoji}</Text>
        </View>
        <View style={styles.actBtnInfo}>
          <Text style={[styles.actBtnTag, { color: act.color.mid }]}>{act.tag}</Text>
          <Text style={styles.actBtnName}>{act.shortName}</Text>
          <View style={[styles.actBtnPill, { backgroundColor: act.color.light }]}>
            <Text style={[styles.actBtnProgress, { color: act.color.dark }]}>
              {act.progress}/{act.total} done
            </Text>
          </View>
        </View>
        <MochiCharacter accessory={act.mochi} size={52} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const voucherSpring = useSpringPress(0.94);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>JALAN BESAR</Text>
            <Text style={styles.headerTitle}>Mochi Meadows</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>LV {PLAYER.level}</Text>
            </View>
            <MochiCharacter accessory="bow" size={48} />
          </View>
        </View>

        {/* ── Map ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>NEARBY IN JALAN BESAR</Text>
          <View style={styles.mapCard}>
            <GoogleMap height={200} />
          </View>
        </View>

        {/* ── All Activities ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ALL ACTIVITIES</Text>
          <View style={styles.activityGrid}>
            {ACTIVITIES.map((act) => (
              <ActivityCard
                key={act.id}
                act={act}
                onPress={() => router.push(`/activity/${act.id}` as any)}
              />
            ))}
          </View>
        </View>

        {/* ── Social Features ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>👥 SOCIAL FEATURES</Text>
          <View style={styles.socialGrid}>
            {[
              { emoji: '🗺️', title: 'Social Meadow', desc: "See where friends' Mochi are exploring on the shared map", color: colors.teal },
              { emoji: '🏆', title: 'Leaderboards', desc: 'Weekly rankings, friend challenges & group rewards', color: colors.amber },
              { emoji: '🌍', title: 'Discovery Map', desc: 'Live heat-map of player activity across Jalan Besar', color: colors.blue },
              { emoji: '📖', title: 'Heritage Journal', desc: 'Your personal log of every heritage story unlocked', color: colors.purple },
            ].map(item => (
              <View key={item.title} style={[styles.socialCard, { backgroundColor: item.color.bg, borderColor: item.color.light }]}>
                <Text style={styles.socialCardEmoji}>{item.emoji}</Text>
                <Text style={[styles.socialCardTitle, { color: item.color.dark }]}>{item.title}</Text>
                <Text style={[styles.socialCardDesc, { color: item.color.mid }]}>{item.desc}</Text>
                <View style={[styles.comingSoonPill, { backgroundColor: item.color.light }]}>
                  <Text style={[styles.comingSoonText, { color: item.color.dark }]}>Coming Soon</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── CDC Voucher Banner ── */}
        <View style={styles.voucherBanner}>
          <Text style={styles.voucherEmoji}>🎟️</Text>
          <View style={styles.voucherText}>
            <Text style={styles.voucherTitle}>CDC Vouchers Available</Text>
            <Text style={styles.voucherSub}>Complete 3 Time Travelling landmarks to claim yours</Text>
          </View>
          <Animated.View style={{ transform: [{ scale: voucherSpring.scale }] }}>
            <TouchableOpacity
              style={styles.voucherBtn}
              activeOpacity={1}
              onPressIn={voucherSpring.pressIn}
              onPressOut={voucherSpring.pressOut}
              onPress={() => router.push('/activity/time')}
            >
              <Text style={styles.voucherBtnText}>Go →</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 8,
  },
  headerSub: {
    fontSize: 10,
    color: colors.lpink,
    letterSpacing: 2,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 26,
    color: colors.text,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerRight: {
    alignItems: 'center',
    gap: 4,
  },
  levelBadge: {
    backgroundColor: colors.pink,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  levelText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  mochiAvatar: {},

  // Section
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    color: colors.lpink,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 12,
  },

  // Map
  mapCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
  },
  mapLabelText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },

  // Activity list (game-button style)
  activityGrid: {
    flexDirection: 'column',
  },
  activityBtn: {
    backgroundColor: '#FFFEF8',
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#6B4020',
    borderBottomWidth: 7,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  actBtnIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  actBtnEmoji: { fontSize: 26 },
  actBtnInfo: { flex: 1, gap: 4 },
  actBtnTag: { fontSize: 9, fontWeight: '700', letterSpacing: 1.2, opacity: 0.8 },
  actBtnName: { fontSize: 16, fontWeight: '900', color: '#3A2008', lineHeight: 19 },
  actBtnPill: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  actBtnProgress: { fontSize: 10, fontWeight: '700' },

  // Social features grid
  socialGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  socialCard: {
    width: '47%',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    gap: 4,
  },
  socialCardEmoji: { fontSize: 22 },
  socialCardTitle: { fontSize: 12, fontWeight: '800' },
  socialCardDesc: { fontSize: 10, lineHeight: 14, opacity: 0.85 },
  comingSoonPill: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  comingSoonText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.3 },

  // CDC voucher banner
  voucherBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFEF8',
    borderRadius: 20,
    padding: 14,
    gap: 10,
    borderWidth: 3,
    borderColor: '#6B4020',
    borderBottomWidth: 6,
  },
  voucherEmoji: {
    fontSize: 28,
  },
  voucherText: {
    flex: 1,
  },
  voucherTitle: {
    color: '#3A2008',
    fontSize: 14,
    fontWeight: '800',
  },
  voucherSub: {
    color: colors.lgrey,
    fontSize: 12,
    marginTop: 2,
  },
  voucherBtn: {
    backgroundColor: colors.pink,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: '#C45A00',
    borderBottomWidth: 5,
  },
  voucherBtnText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 13,
  },
});

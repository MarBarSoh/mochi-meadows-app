import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import MochiCharacter, { AccessoryId } from '@/components/MochiCharacter';

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
    reward: 'CDC Voucher',
    rewardEmoji: '🎟️',
    description: 'Visit 3 heritage hawker stalls\naround Jalan Besar',
    tag: 'HERO ACTIVITY',
    hero: true,
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
    reward: 'Kapitan Cap',
    rewardEmoji: '🏅',
    description: 'Match archival photos to real landmarks',
    tag: 'PHOTO HUNT',
    hero: false,
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
    reward: 'Artist Beret',
    rewardEmoji: '🎓',
    description: 'Photograph Mochi at local murals',
    tag: 'AR CAMERA',
    hero: false,
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
    reward: 'Hardhat & Toolbelt',
    rewardEmoji: '🪖',
    description: 'Discover traditional trade shops',
    tag: 'SHOP VISIT',
    hero: false,
  },
];

const WAYPOINTS = [
  { label: 'Swee Choon Dim Sum', emoji: '🥟', x: 22, y: 34 },
  { label: 'Sungei Rd Laksa', emoji: '🍜', x: 58, y: 22 },
  { label: 'Beach Rd Curry Rice', emoji: '🍛', x: 74, y: 52 },
  { label: 'Rad Son Lighting', emoji: '💡', x: 40, y: 68 },
  { label: 'Mural: Jalan Besar FC', emoji: '🎨', x: 62, y: 78 },
];

export default function HomeScreen() {
  const router = useRouter();
  const hero = ACTIVITIES[0];
  const others = ACTIVITIES.slice(1);

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
              <Text style={styles.levelText}>LV 1</Text>
            </View>
            <MochiCharacter accessory="bow" size={48} />
          </View>
        </View>

        {/* ── Hero: Bring Back the Food ── */}
        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.88}
          onPress={() => router.push('/activity/food')}
        >
          <View style={styles.heroInner}>
            <View style={styles.heroBadgeRow}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>⭐ HERO ACTIVITY</Text>
              </View>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>MOST POPULAR</Text>
              </View>
            </View>

            <Text style={styles.heroEmoji}>🍜</Text>
            <Text style={styles.heroTitle}>Bring Back{'\n'}the Food</Text>
            <Text style={styles.heroDesc}>
              Visit 3 heritage hawker stalls and earn a{' '}
              <Text style={styles.heroHighlight}>CDC Voucher</Text>
            </Text>

            <View style={styles.heroProgress}>
              <View style={styles.heroProgressBar}>
                <View style={[styles.heroProgressFill, { width: `${(1 / 3) * 100}%` }]} />
              </View>
              <Text style={styles.heroProgressText}>1 of 3 stalls visited</Text>
            </View>

            <View style={styles.heroStalls}>
              {[
                { name: 'Swee Choon\nDim Sum', done: true, emoji: '🥟' },
                { name: 'Sungei Rd\nLaksa', done: false, emoji: '🍜' },
                { name: 'Beach Rd\nCurry Rice', done: false, emoji: '🍛' },
              ].map((stall) => (
                <View
                  key={stall.name}
                  style={[styles.stallChip, stall.done && styles.stallChipDone]}
                >
                  <Text style={styles.stallEmoji}>{stall.emoji}</Text>
                  <Text style={[styles.stallName, stall.done && styles.stallNameDone]}>
                    {stall.name}
                  </Text>
                  {stall.done && <Text style={styles.stallCheck}>✓</Text>}
                </View>
              ))}
            </View>

            <View style={styles.heroReward}>
              <Text style={styles.heroRewardEmoji}>🎟️</Text>
              <View>
                <Text style={styles.heroRewardLabel}>COMPLETE TO UNLOCK</Text>
                <Text style={styles.heroRewardValue}>CDC Voucher + Amber Mochi Set</Text>
              </View>
              <Text style={styles.heroArrow}>›</Text>
            </View>
          </View>

          {/* decorative mochi */}
          <View style={styles.heroMochi}>
            <MochiCharacter accessory="bow" size={100} />
          </View>
        </TouchableOpacity>

        {/* ── Map ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>NEARBY IN JALAN BESAR</Text>
          <View style={styles.mapCard}>
            <View style={styles.mapBg}>
              {/* road lines */}
              <View style={[styles.road, styles.roadH, { top: '40%' }]} />
              <View style={[styles.road, styles.roadH, { top: '65%' }]} />
              <View style={[styles.road, styles.roadV, { left: '35%' }]} />
              <View style={[styles.road, styles.roadV, { left: '65%' }]} />

              {/* waypoints */}
              {WAYPOINTS.map((wp) => (
                <View
                  key={wp.label}
                  style={[styles.waypoint, { left: `${wp.x}%`, top: `${wp.y}%` }]}
                >
                  <View style={styles.waypointPin}>
                    <Text style={styles.waypointEmoji}>{wp.emoji}</Text>
                  </View>
                </View>
              ))}

              <View style={styles.mapLabel}>
                <Text style={styles.mapLabelText}>📍 Jalan Besar</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Other Activities ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ALL ACTIVITIES</Text>
          <View style={styles.activityGrid}>
            {others.map((act) => (
              <TouchableOpacity
                key={act.id}
                style={[styles.activityCard, { backgroundColor: act.color.bg }]}
                activeOpacity={0.85}
                onPress={() => router.push(`/activity/${act.id}` as any)}
              >
                <View style={[styles.activityIconBg, { backgroundColor: act.color.mid }]}>
                  <Text style={styles.activityEmoji}>{act.emoji}</Text>
                </View>
                <Text style={[styles.activityTag, { color: act.color.dark }]}>{act.tag}</Text>
                <Text style={[styles.activityName, { color: act.color.dark }]}>{act.name}</Text>
                <View style={styles.activityFooter}>
                  <Text style={[styles.activityProgress, { color: act.color.mid }]}>
                    {act.progress}/{act.total}
                  </Text>
                  <MochiCharacter accessory={act.mochi} size={42} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── CDC Voucher Banner ── */}
        <View style={styles.voucherBanner}>
          <Text style={styles.voucherEmoji}>🎟️</Text>
          <View style={styles.voucherText}>
            <Text style={styles.voucherTitle}>CDC Vouchers Available</Text>
            <Text style={styles.voucherSub}>Complete the Food Trail to claim yours</Text>
          </View>
          <TouchableOpacity
            style={styles.voucherBtn}
            onPress={() => router.push('/activity/food')}
          >
            <Text style={styles.voucherBtnText}>Go →</Text>
          </TouchableOpacity>
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
    color: colors.white,
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

  // Hero card
  heroCard: {
    backgroundColor: colors.amber.bg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.amber.light,
    position: 'relative',
  },
  heroInner: {
    flex: 1,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  heroBadge: {
    backgroundColor: colors.amber.mid,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  heroBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  newBadge: {
    backgroundColor: colors.amber.light,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newBadgeText: {
    color: colors.amber.dark,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  heroEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.amber.dark,
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 14,
    color: colors.amber.dark,
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 16,
  },
  heroHighlight: {
    fontWeight: '800',
    color: colors.amber.mid,
  },
  heroProgress: {
    marginBottom: 16,
    gap: 6,
  },
  heroProgressBar: {
    height: 8,
    backgroundColor: colors.amber.light,
    borderRadius: 4,
    overflow: 'hidden',
  },
  heroProgressFill: {
    height: '100%',
    backgroundColor: colors.amber.mid,
    borderRadius: 4,
  },
  heroProgressText: {
    fontSize: 12,
    color: colors.amber.dark,
    fontWeight: '600',
    opacity: 0.8,
  },
  heroStalls: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  stallChip: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.amber.light,
  },
  stallChipDone: {
    backgroundColor: colors.amber.mid,
    borderColor: colors.amber.mid,
  },
  stallEmoji: {
    fontSize: 18,
  },
  stallName: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.amber.dark,
    textAlign: 'center',
    lineHeight: 13,
  },
  stallNameDone: {
    color: colors.white,
  },
  stallCheck: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '800',
  },
  heroReward: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 14,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.amber.light,
  },
  heroRewardEmoji: {
    fontSize: 24,
  },
  heroRewardLabel: {
    fontSize: 9,
    color: colors.amber.dark,
    fontWeight: '700',
    letterSpacing: 1,
    opacity: 0.7,
  },
  heroRewardValue: {
    fontSize: 13,
    color: colors.amber.dark,
    fontWeight: '700',
  },
  heroArrow: {
    fontSize: 22,
    color: colors.amber.mid,
    fontWeight: '700',
    marginLeft: 'auto',
  },
  heroMochi: {
    position: 'absolute',
    top: 0,
    right: -10,
    opacity: 0.22,
    pointerEvents: 'none' as any,
  },

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
  mapBg: {
    flex: 1,
    backgroundColor: '#2D1F4A',
    position: 'relative',
  },
  road: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  roadH: {
    left: 0,
    right: 0,
    height: 18,
  },
  roadV: {
    top: 0,
    bottom: 0,
    width: 18,
  },
  waypoint: {
    position: 'absolute',
    transform: [{ translateX: -18 }, { translateY: -18 }],
  },
  waypointPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.amber.mid,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  waypointEmoji: {
    fontSize: 18,
  },
  mapLabel: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    backgroundColor: 'rgba(26,16,51,0.8)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  mapLabelText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },

  // Activity grid
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  activityCard: {
    width: '47%',
    borderRadius: 16,
    padding: 14,
    minHeight: 130,
  },
  activityIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityTag: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
    opacity: 0.7,
  },
  activityName: {
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 18,
    flex: 1,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  activityProgress: {
    fontSize: 12,
    fontWeight: '700',
  },
  activityMochi: {},

  // CDC voucher banner
  voucherBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212,112,138,0.12)',
    borderRadius: 16,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(212,112,138,0.3)',
  },
  voucherEmoji: {
    fontSize: 28,
  },
  voucherText: {
    flex: 1,
  },
  voucherTitle: {
    color: colors.lpink,
    fontSize: 14,
    fontWeight: '700',
  },
  voucherSub: {
    color: colors.lgrey,
    fontSize: 12,
    marginTop: 2,
  },
  voucherBtn: {
    backgroundColor: colors.pink,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  voucherBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
});

import { useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { PLAYER } from '@/constants/playerState';

const meadow = require('../../assets/images/meadow.png');

type LevelReward = {
  level: number;
  title: string;
  accessories: { emoji: string; name: string }[];
  xpRequired: number;
  claimed: boolean;
  claimable: boolean;
};

const INITIAL_LEVELS: LevelReward[] = [
  {
    level: 1,
    title: 'Starter Explorer',
    accessories: [
      { emoji: '✨', name: 'Plain Mochi' },
      { emoji: '🎀', name: 'Pink Bow' },
    ],
    xpRequired: 0,
    claimed: true,
    claimable: false,
  },
  {
    level: 2,
    title: 'Neighbourhood Scout',
    accessories: [{ emoji: '🧢', name: 'Kapitan Cap' }],
    xpRequired: 500,
    claimed: true,
    claimable: false,
  },
  {
    level: 3,
    title: 'Street Artist',
    accessories: [{ emoji: '🎓', name: 'Artist Beret' }],
    xpRequired: 1200,
    claimed: true,
    claimable: false,
  },
  {
    level: 4,
    title: 'Skilled Maker',
    accessories: [{ emoji: '⛑️', name: 'Hardhat' }],
    xpRequired: 2200,
    claimed: false,
    claimable: true,
  },
  {
    level: 5,
    title: 'Heritage Foodie',
    accessories: [{ emoji: '🍞', name: 'Kaya Toast Hat' }],
    xpRequired: 3500,
    claimed: false,
    claimable: false,
  },
  {
    level: 6,
    title: 'Master Craftsman',
    accessories: [{ emoji: '🔧', name: 'Toolbelt' }],
    xpRequired: 5000,
    claimed: false,
    claimable: false,
  },
  {
    level: 7,
    title: 'Rattan Weaver',
    accessories: [{ emoji: '👜', name: 'Rattan Bag' }],
    xpRequired: 7000,
    claimed: false,
    claimable: false,
  },
  {
    level: 8,
    title: 'Heritage Master',
    accessories: [{ emoji: '🏮', name: 'Heritage Lantern' }],
    xpRequired: 10000,
    claimed: false,
    claimable: false,
  },
];

const XP_SOURCES = [
  { emoji: '🍜', action: 'Visit a hawker stall', xp: '+200 XP' },
  { emoji: '📸', action: 'Match a landmark photo', xp: '+150 XP' },
  { emoji: '🎨', action: 'Submit mural artwork', xp: '+100 XP' },
  { emoji: '🔧', action: 'Visit a trade shop', xp: '+150 XP' },
  { emoji: '🏆', action: 'Complete a full trail', xp: '+500 XP' },
  { emoji: '⭐', action: 'First time at any stall', xp: '+50 XP' },
];

function ClaimButton({ onClaim }: { onClaim: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.93, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 14 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], marginTop: 12 }}>
      <TouchableOpacity
        style={styles.claimBtn}
        activeOpacity={1}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={onClaim}
      >
        <Text style={styles.claimBtnText}>🎁  Claim Reward!</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function RewardsScreen() {
  const [levels, setLevels] = useState<LevelReward[]>(INITIAL_LEVELS);
  const [justClaimed, setJustClaimed] = useState<number | null>(null);

  const xpProgress = PLAYER.xpProgress;

  const handleClaim = (levelNum: number) => {
    setLevels(prev =>
      prev.map(l => l.level === levelNum ? { ...l, claimed: true, claimable: false } : l)
    );
    setJustClaimed(levelNum);
    setTimeout(() => setJustClaimed(null), 3000);
  };

  return (
    <ImageBackground source={meadow} style={{ flex: 1 }} resizeMode="cover">
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Profile chip */}
      <View style={styles.topRow}>
        <View style={styles.profileChip}>
          <Text style={styles.profileName}>{PLAYER.name}</Text>
          <View style={styles.avatarCircle}><Text style={{ fontSize: 16 }}>👤</Text></View>
        </View>
      </View>
      <View style={styles.pageTitle}>
        <Text style={styles.pageTitleShadow}>REWARDS</Text>
        <Text style={styles.pageTitleText}>REWARDS</Text>
      </View>
      <View style={styles.cardPanel}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Level progress card */}
        <View style={styles.levelCard}>
          <View style={styles.levelCardTop}>
            <View style={styles.levelBadgeLarge}>
              <Text style={styles.levelBadgeText}>LV {PLAYER.level}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.levelTitle}>Skilled Maker</Text>
              <Text style={styles.levelXPText}>{PLAYER.xp.toLocaleString()} XP total</Text>
            </View>
            <Text style={styles.nextLevelLabel}>→ LV {PLAYER.level + 1}</Text>
          </View>
          <View style={styles.levelProgressBar}>
            <View style={[styles.levelProgressFill, { width: `${Math.round(xpProgress * 100)}%` }]} />
          </View>
          <Text style={styles.levelProgressHint}>
            {PLAYER.xpToNext} XP to reach Level {PLAYER.level + 1}
          </Text>

          {justClaimed !== null && (
            <View style={styles.celebrationBanner}>
              <Text style={styles.celebrationText}>🎉 Reward claimed! Check your accessories!</Text>
            </View>
          )}
        </View>

        {/* Level milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🏆 LEVEL MILESTONES</Text>

          {levels.map((lvl) => {
            const isLocked = !lvl.claimed && !lvl.claimable;
            const xpNeeded = lvl.xpRequired - PLAYER.xp;

            return (
              <View
                key={lvl.level}
                style={[
                  styles.milestoneCard,
                  lvl.claimed && styles.milestoneCardClaimed,
                  lvl.claimable && styles.milestoneCardClaimable,
                  isLocked && styles.milestoneCardLocked,
                ]}
              >
                <View style={[
                  styles.milestoneLevelCircle,
                  lvl.claimed && styles.milestoneLevelCircleClaimed,
                  lvl.claimable && styles.milestoneLevelCircleClaimable,
                  isLocked && styles.milestoneLevelCircleLocked,
                ]}>
                  <Text style={[
                    styles.milestoneLevelNum,
                    isLocked && styles.milestoneLevelNumLocked,
                  ]}>
                    {lvl.claimed ? '✓' : lvl.claimable ? '🎁' : lvl.level}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.milestoneTitleRow}>
                    <Text style={[
                      styles.milestoneTitle,
                      lvl.claimed && { color: '#3A2008' },
                      lvl.claimable && { color: '#8B4513' },
                      isLocked && { color: colors.lgrey },
                    ]}>
                      LV {lvl.level} — {lvl.title}
                    </Text>
                    {lvl.claimed && (
                      <View style={styles.claimedPill}>
                        <Text style={styles.claimedPillText}>Claimed</Text>
                      </View>
                    )}
                    {isLocked && (
                      <View style={styles.lockedPill}>
                        <Text style={styles.lockedPillText}>
                          {xpNeeded > 0 ? `${xpNeeded} XP away` : '🔒'}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.accRow}>
                    {lvl.accessories.map((acc) => (
                      <View
                        key={acc.name}
                        style={[styles.accChip, isLocked && styles.accChipLocked]}
                      >
                        <Text style={[styles.accChipEmoji, isLocked && { opacity: 0.4 }]}>{acc.emoji}</Text>
                        <Text style={[styles.accChipName, isLocked && styles.accChipNameLocked]}>{acc.name}</Text>
                      </View>
                    ))}
                  </View>

                  {lvl.claimable && (
                    <ClaimButton onClaim={() => handleClaim(lvl.level)} />
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* XP sources */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>⚡ HOW TO EARN XP</Text>
          <View style={styles.xpSourceCard}>
            {XP_SOURCES.map((src) => (
              <View key={src.action} style={styles.xpSourceRow}>
                <Text style={styles.xpSourceEmoji}>{src.emoji}</Text>
                <Text style={styles.xpSourceAction}>{src.action}</Text>
                <View style={styles.xpSourceBadge}>
                  <Text style={styles.xpSourceXP}>{src.xp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },

  topRow: { alignItems: 'flex-end', paddingHorizontal: 16, paddingTop: 8 },
  profileChip: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  profileName: { fontSize: 16, fontWeight: '700', fontStyle: 'italic', color: '#1A0A00' },
  avatarCircle: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#1A0A00', alignItems: 'center', justifyContent: 'center',
  },

  pageTitle: { paddingHorizontal: 20, marginTop: 10, marginBottom: 10, position: 'relative', height: 40 },
  pageTitleShadow: {
    position: 'absolute', left: 23, top: 3,
    fontSize: 32, fontWeight: '900', fontStyle: 'italic', color: '#4A2000',
  },
  pageTitleText: {
    position: 'absolute', left: 20, top: 0,
    fontSize: 32, fontWeight: '900', fontStyle: 'italic', color: '#FF8C00',
  },

  cardPanel: {
    flex: 1,
    backgroundColor: 'rgba(253,246,236,0.97)',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    overflow: 'hidden',
    borderTopWidth: 3, borderLeftWidth: 2, borderRightWidth: 2,
    borderColor: '#C9A878',
  },
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 16 },

  header: { marginBottom: 20, paddingTop: 8 },
  headerSub: { fontSize: 10, color: colors.lpink, letterSpacing: 2, fontWeight: '700' },
  headerTitle: { fontSize: 26, color: colors.text, fontWeight: '800', letterSpacing: -0.5 },

  // Level card
  levelCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#6B4020',
    borderBottomWidth: 6,
  },
  levelCardTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  levelBadgeLarge: {
    backgroundColor: colors.pink,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 2.5,
    borderColor: '#C45A00',
    borderBottomWidth: 5,
  },
  levelBadgeText: { fontSize: 16, color: colors.white, fontWeight: '900', letterSpacing: 0.5 },
  levelTitle: { fontSize: 16, color: '#3A2008', fontWeight: '800' },
  levelXPText: { fontSize: 12, color: colors.lgrey, marginTop: 2 },
  nextLevelLabel: { fontSize: 13, color: colors.lpink, fontWeight: '700' },
  levelProgressBar: {
    height: 14,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 7,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: colors.pink,
    borderRadius: 7,
  },
  levelProgressHint: { fontSize: 11, color: colors.lgrey, marginTop: 8, textAlign: 'center' },
  celebrationBanner: {
    marginTop: 12,
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 10,
    borderWidth: 2,
    borderColor: '#E8721A',
  },
  celebrationText: { fontSize: 13, color: '#8B4513', fontWeight: '700', textAlign: 'center' },

  // Section
  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 11, color: colors.lpink, letterSpacing: 2, fontWeight: '700', marginBottom: 14 },

  // Milestone cards
  milestoneCard: {
    flexDirection: 'row',
    gap: 14,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 3,
    borderBottomWidth: 6,
    alignItems: 'flex-start',
  },
  milestoneCardClaimed: {
    backgroundColor: '#F0FAF0',
    borderColor: '#A0C878',
  },
  milestoneCardClaimable: {
    backgroundColor: '#FFF3CD',
    borderColor: '#E8721A',
  },
  milestoneCardLocked: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderColor: 'rgba(0,0,0,0.12)',
    borderBottomWidth: 3,
    opacity: 0.75,
  },

  milestoneLevelCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  milestoneLevelCircleClaimed: { backgroundColor: '#5BAD3F' },
  milestoneLevelCircleClaimable: { backgroundColor: colors.pink },
  milestoneLevelCircleLocked: { backgroundColor: 'rgba(0,0,0,0.08)' },

  milestoneLevelNum: { fontSize: 16, color: colors.white, fontWeight: '900' },
  milestoneLevelNumLocked: { color: colors.lgrey },

  milestoneTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
  milestoneTitle: { fontSize: 13, fontWeight: '800', flex: 1 },

  claimedPill: {
    backgroundColor: '#5BAD3F',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  claimedPillText: { fontSize: 9, color: 'white', fontWeight: '800', letterSpacing: 0.3 },
  lockedPill: {
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  lockedPillText: { fontSize: 9, color: colors.lgrey, fontWeight: '700' },

  accRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  accChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  accChipLocked: { backgroundColor: 'rgba(0,0,0,0.04)', borderColor: 'rgba(0,0,0,0.06)' },
  accChipEmoji: { fontSize: 18 },
  accChipName: { fontSize: 12, color: '#3A2008', fontWeight: '600' },
  accChipNameLocked: { color: colors.lgrey },

  // Claim button
  claimBtn: {
    backgroundColor: '#FFFEF8',
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#6B4020',
    borderBottomWidth: 7,
    paddingVertical: 12,
    alignItems: 'center',
  },
  claimBtnText: { color: '#3A2008', fontWeight: '900', fontSize: 15, letterSpacing: 0.3 },

  // XP sources
  xpSourceCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 3,
    borderColor: '#6B4020',
    borderBottomWidth: 6,
    gap: 12,
  },
  xpSourceRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  xpSourceEmoji: { fontSize: 22, width: 30, textAlign: 'center' },
  xpSourceAction: { flex: 1, fontSize: 13, color: '#3A2008', fontWeight: '600' },
  xpSourceBadge: {
    backgroundColor: colors.amber.bg,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: colors.amber.light,
  },
  xpSourceXP: { fontSize: 12, color: colors.amber.dark, fontWeight: '800' },
});

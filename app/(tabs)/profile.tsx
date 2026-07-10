import { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { PLAYER } from '@/constants/playerState';
import MochiCharacter, { AccessoryId } from '@/components/MochiCharacter';

type BgTheme = {
  id: string;
  name: string;
  emoji: string;
  sky: string;
  mid: string;
  xpRow: string;
  grass: string;
  border: string;
  grassEmoji: string;
  unlocked: boolean;
  claimable?: boolean;
  unlockLevel: number;
};

const BACKGROUNDS: BgTheme[] = [
  {
    id: 'sunny',
    name: 'Sunny\nMeadow',
    emoji: '☀️',
    sky: '#6DBFE0',
    mid: '#8ACA5C',
    xpRow: '#79BC4C',
    grass: '#5BAD3F',
    border: '#A8D8EA',
    grassEmoji: '🌿 🌸 🌺 🌿 🌸 🌺 🌿',
    unlocked: true,
    unlockLevel: 1,
  },
  {
    id: 'cherry',
    name: 'Cherry\nGarden',
    emoji: '🌸',
    sky: '#FFCCD8',
    mid: '#F09BB0',
    xpRow: '#E07090',
    grass: '#C84A70',
    border: '#FFB7C5',
    grassEmoji: '🌸 🌸 🌸 🌸 🌸 🌸 🌸',
    unlocked: true,
    unlockLevel: 2,
  },
  {
    id: 'beach',
    name: 'Sunset\nBeach',
    emoji: '🌊',
    sky: '#5B9FCC',
    mid: '#3A8AAF',
    xpRow: '#2A749A',
    grass: '#1A5A85',
    border: '#7AB5D5',
    grassEmoji: '🌊 🐚 🌊 🐚 🌊 🐚 🌊',
    unlocked: true,
    unlockLevel: 3,
  },
  {
    id: 'night',
    name: 'City\nNight',
    emoji: '🌃',
    sky: '#1A1040',
    mid: '#2A1A5A',
    xpRow: '#3A2A70',
    grass: '#4A3A80',
    border: '#6A5AAA',
    grassEmoji: '✨ 🌟 ✨ 🌟 ✨ 🌟 ✨',
    unlocked: false,
    claimable: true,
    unlockLevel: 4,
  },
  {
    id: 'autumn',
    name: 'Golden\nGarden',
    emoji: '🍂',
    sky: '#E8982A',
    mid: '#D07018',
    xpRow: '#B85808',
    grass: '#924000',
    border: '#F0B040',
    grassEmoji: '🍂 🍁 🌻 🍂 🍁 🌻 🍂',
    unlocked: false,
    unlockLevel: 5,
  },
];

type Accessory = {
  id: AccessoryId;
  name: string;
  emoji: string;
  unlocked: boolean;
  claimable?: boolean;
  unlockLevel: number;
};

const ACCESSORIES: Accessory[] = [
  { id: 'none',     name: 'Plain',           emoji: '✨', unlocked: true,  unlockLevel: 1 },
  { id: 'bow',      name: 'Pink Bow',         emoji: '🎀', unlocked: true,  unlockLevel: 1 },
  { id: 'cap',      name: 'Kapitan Cap',      emoji: '🧢', unlocked: true,  unlockLevel: 2 },
  { id: 'beret',    name: 'Artist Beret',     emoji: '🎓', unlocked: true,  unlockLevel: 3 },
  { id: 'hardhat',  name: 'Hardhat',          emoji: '⛑️', unlocked: false, unlockLevel: 4, claimable: true },
  { id: 'toast',    name: 'Kaya Toast',       emoji: '🍞', unlocked: false, unlockLevel: 5 },
  { id: 'toolbelt', name: 'Toolbelt',         emoji: '🔧', unlocked: false, unlockLevel: 6 },
  { id: 'bag',      name: 'Rattan Bag',       emoji: '👜', unlocked: false, unlockLevel: 7 },
  { id: 'lantern',  name: 'Heritage Lantern', emoji: '🏮', unlocked: false, unlockLevel: 8 },
];

const BIOMES = [
  { name: 'Starter\nPatch',    unlocked: true,  emoji: '🌱', color: colors.teal  },
  { name: 'Amber\nGarden',     unlocked: true,  emoji: '🌻', color: colors.amber },
  { name: 'Heritage\nGrove',   unlocked: false, emoji: '🌳', color: colors.blue  },
  { name: "Maker's\nForge",    unlocked: false, emoji: '⚒️', color: colors.purple },
];

const STATS = [
  { label: 'Activities\nStarted', value: String(PLAYER.activitiesStarted), emoji: '🗺️' },
  { label: 'Stalls\nVisited',     value: String(PLAYER.stallsDone),        emoji: '🍜' },
  { label: 'Accessories\nOwned',  value: String(PLAYER.accessoriesOwned),  emoji: '🎀' },
  { label: 'Meadow\nLevel',       value: `LV ${PLAYER.level}`,             emoji: '🌸' },
];

function AccSlot({ acc, isEquipped, onPress }: {
  acc: Accessory;
  isEquipped: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const isInteractive = acc.unlocked || acc.claimable;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.86, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 18, bounciness: 16 }).start();

  useEffect(() => {
    if (acc.claimable) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.06, duration: 700, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        ])
      ).start();
    }
  }, [acc.claimable, pulseAnim]);

  return (
    <Animated.View style={{
      transform: [{ scale: Animated.multiply(scale, acc.claimable ? pulseAnim : new Animated.Value(1)) }],
      width: '29%',
    }}>
      <TouchableOpacity
        style={[
          styles.accItem,
          isEquipped && styles.accItemEquipped,
          acc.claimable && styles.accItemClaimable,
          !isInteractive && styles.accItemLocked,
        ]}
        activeOpacity={1}
        onPressIn={isInteractive ? pressIn : undefined}
        onPressOut={isInteractive ? pressOut : undefined}
        onPress={onPress}
      >
        {!isInteractive && (
          <View style={styles.levelLockBadge}>
            <Text style={styles.levelLockText}>LV {acc.unlockLevel}</Text>
          </View>
        )}
        {acc.claimable && (
          <View style={styles.claimBadge}>
            <Text style={styles.claimBadgeIcon}>🎁</Text>
          </View>
        )}
        <Text style={[styles.accEmoji, !isInteractive && styles.accEmojiLocked]}>{acc.emoji}</Text>
        <Text style={[
          styles.accName,
          isEquipped && styles.accNameEquipped,
          acc.claimable && styles.accNameClaimable,
          !isInteractive && styles.accNameLocked,
        ]}>
          {acc.name}
        </Text>
        {isEquipped && (
          <View style={styles.equippedBadge}>
            <Text style={styles.equippedBadgeText}>ON</Text>
          </View>
        )}
        {acc.claimable && !isEquipped && (
          <Text style={styles.claimText}>Claim!</Text>
        )}
        {!isInteractive && (
          <Text style={styles.levelRequireText}>Reach LV {acc.unlockLevel}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

function BgSlot({ bg, isSelected, onPress }: {
  bg: BgTheme;
  isSelected: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const isInteractive = bg.unlocked || bg.claimable;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.88, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 18, bounciness: 16 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
      <TouchableOpacity
        style={[
          styles.bgSlot,
          isSelected && styles.bgSlotSelected,
          !isInteractive && styles.bgSlotLocked,
        ]}
        activeOpacity={1}
        onPressIn={isInteractive ? pressIn : undefined}
        onPressOut={isInteractive ? pressOut : undefined}
        onPress={onPress}
      >
        <View style={[styles.bgMiniPreview, { backgroundColor: bg.sky }]}>
          <View style={[styles.bgMiniMid, { backgroundColor: bg.mid }]} />
          <View style={[styles.bgMiniGrass, { backgroundColor: bg.grass }]} />
        </View>
        {!isInteractive && (
          <View style={styles.bgLockBadge}>
            <Text style={styles.bgLockText}>LV{bg.unlockLevel}</Text>
          </View>
        )}
        {bg.claimable && (
          <View style={styles.bgClaimBadge}>
            <Text style={styles.bgClaimIcon}>🎁</Text>
          </View>
        )}
        <Text style={styles.bgSlotEmoji}>{bg.emoji}</Text>
        <Text style={[styles.bgSlotName, !isInteractive && styles.bgSlotNameLocked]}>{bg.name}</Text>
        {isSelected && <View style={styles.bgSelectedDot} />}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const [equippedId, setEquippedId] = useState<AccessoryId>('beret');
  const [selectedBgId, setSelectedBgId] = useState('sunny');
  const router = useRouter();
  const equipped = ACCESSORIES.find(a => a.id === equippedId) ?? ACCESSORIES[1];
  const selectedBg = BACKGROUNDS.find(b => b.id === selectedBgId) ?? BACKGROUNDS[0];

  const bobAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, { toValue: -10, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bobAnim, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, [bobAnim]);

  const xpProgress = PLAYER.xpProgress;

  const handleAccPress = (acc: Accessory) => {
    if (acc.unlocked) {
      setEquippedId(acc.id);
    } else if (acc.claimable) {
      router.push('/(tabs)/rewards' as any);
    }
  };

  const handleBgPress = (bg: BgTheme) => {
    if (bg.unlocked) {
      setSelectedBgId(bg.id);
    } else if (bg.claimable) {
      router.push('/(tabs)/rewards' as any);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSub}>YOUR CHARACTER</Text>
          <Text style={styles.headerTitle}>My Mochi</Text>
        </View>

        {/* Meadow Stage */}
        <View style={[styles.meadowStage, { borderColor: selectedBg.border }]}>
          <View style={[styles.skySection, { backgroundColor: selectedBg.sky }]}>
            <Text style={styles.cloudL}>☁️  ☁️</Text>
            <Text style={styles.sunEmoji}>☀️</Text>
            <Text style={styles.cloudR}>☁️</Text>
          </View>

          <View style={[styles.characterArea, { backgroundColor: selectedBg.sky }]}>
            <Animated.View style={{ transform: [{ translateY: bobAnim }] }}>
              <MochiCharacter accessory={equippedId} size={170} />
            </Animated.View>
            <View style={styles.mochiShadow} />
          </View>

          <View style={[styles.nameArea, { backgroundColor: selectedBg.mid }]}>
            <Text style={styles.mochiNameLarge}>
              {equipped.id === 'none' ? 'Plain Mochi' : `${equipped.name} Mochi`}
            </Text>
            <Text style={styles.mochiSubLabel}>Jalan Besar Explorer</Text>
          </View>

          <View style={[styles.xpRow, { backgroundColor: selectedBg.xpRow }]}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>LV {PLAYER.level}</Text>
            </View>
            <View style={styles.xpBarWrapper}>
              <View style={styles.xpBar}>
                <View style={[styles.xpFill, { width: `${Math.round(xpProgress * 100)}%` }]} />
              </View>
              <Text style={styles.xpLabel}>{PLAYER.xp} / {PLAYER.nextLevelXp} XP · {PLAYER.xpToNext} to LV {PLAYER.level + 1}</Text>
            </View>
          </View>

          <View style={[styles.grassStrip, { backgroundColor: selectedBg.grass }]}>
            <Text style={styles.grassEmoji}>{selectedBg.grassEmoji}</Text>
          </View>
        </View>

        {/* Background picker */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>🌅 BACKGROUNDS</Text>
            <Text style={styles.sectionHint}>Tap to switch</Text>
          </View>
          <View style={styles.bgGrid}>
            {BACKGROUNDS.map((bg) => (
              <BgSlot
                key={bg.id}
                bg={bg}
                isSelected={bg.id === selectedBgId}
                onPress={() => handleBgPress(bg)}
              />
            ))}
          </View>
          <View style={styles.lockedHint}>
            <Text style={styles.lockedHintText}>
              🔒 Level up to unlock · 🎁 Claim on Rewards page
            </Text>
          </View>
        </View>

        {/* Claimable reward callout */}
        <TouchableOpacity
          style={styles.claimCallout}
          onPress={() => router.push('/(tabs)/rewards' as any)}
          activeOpacity={0.85}
        >
          <Text style={styles.claimCalloutEmoji}>🎁</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.claimCalloutTitle}>LV {PLAYER.level} Reward Ready!</Text>
            <Text style={styles.claimCalloutSub}>Tap to claim your Hardhat on Rewards page</Text>
          </View>
          <Text style={styles.claimCalloutArrow}>›</Text>
        </TouchableOpacity>

        {/* Accessories */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>🎀 ACCESSORIES</Text>
            <Text style={styles.sectionHint}>Tap to equip</Text>
          </View>
          <View style={styles.accessoryGrid}>
            {ACCESSORIES.map((acc) => (
              <AccSlot
                key={acc.id}
                acc={acc}
                isEquipped={acc.id === equippedId}
                onPress={() => handleAccPress(acc)}
              />
            ))}
          </View>
          <View style={styles.lockedHint}>
            <Text style={styles.lockedHintText}>
              🔒 Level up to unlock new accessories · ⭐ Go to Rewards to claim
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>📊 STATS</Text>
          <View style={styles.statsGrid}>
            {STATS.map((s) => (
              <View key={s.label} style={styles.statCard}>
                <Text style={styles.statEmoji}>{s.emoji}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mochi Meadow */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🌸 MOCHI MEADOW</Text>
          <View style={styles.biomeRow}>
            {BIOMES.map((b) => (
              <View
                key={b.name}
                style={[styles.biome, b.unlocked ? { backgroundColor: b.color.bg, borderColor: b.color.light } : styles.biomeLocked]}
              >
                <Text style={styles.biomeEmoji}>{b.emoji}</Text>
                <Text style={[styles.biomeName, b.unlocked ? { color: b.color.dark } : styles.biomeNameLocked]}>
                  {b.name}
                </Text>
                {!b.unlocked && <Text style={styles.biomeLock}>🔒</Text>}
              </View>
            ))}
          </View>
          <Text style={styles.biomeHint}>Complete activities to unlock new biomes</Text>
        </View>

        <View style={{ height: 8 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20 },

  header: { marginBottom: 16, paddingTop: 2 },
  headerSub: { fontSize: 10, color: colors.lpink, letterSpacing: 2, fontWeight: '700' },
  headerTitle: { fontSize: 26, color: colors.text, fontWeight: '800', letterSpacing: -0.5 },

  // Meadow Stage
  meadowStage: { borderRadius: 20, overflow: 'hidden', marginBottom: 14, borderWidth: 1.5 },
  skySection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 2,
  },
  cloudL: { fontSize: 22, opacity: 0.9 },
  cloudR: { fontSize: 17, opacity: 0.75, marginTop: 10 },
  sunEmoji: { fontSize: 30, marginTop: -4 },
  characterArea: { alignItems: 'center', paddingTop: 6 },
  mochiShadow: {
    width: 120, height: 22,
    backgroundColor: 'rgba(20,10,0,0.22)',
    borderRadius: 60,
    marginTop: -12,
    alignSelf: 'center',
  },
  nameArea: { alignItems: 'center', paddingTop: 12, paddingBottom: 6 },
  mochiNameLarge: { fontSize: 22, color: '#FFFEF8', fontWeight: '900', letterSpacing: -0.3 },
  mochiSubLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginTop: 2 },
  xpRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 10,
  },
  levelBadge: { backgroundColor: colors.pink, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  levelText: { fontSize: 11, color: colors.white, fontWeight: '800', letterSpacing: 1 },
  xpBarWrapper: { flex: 1, gap: 5 },
  xpBar: { height: 7, backgroundColor: 'rgba(0,0,0,0.18)', borderRadius: 4, overflow: 'hidden' },
  xpFill: { height: '100%', backgroundColor: colors.pink, borderRadius: 4 },
  xpLabel: { fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  grassStrip: { paddingVertical: 10, alignItems: 'center' },
  grassEmoji: { fontSize: 18, letterSpacing: 4 },

  // Background Grid
  bgGrid: { flexDirection: 'row', gap: 6 },
  bgSlot: {
    alignItems: 'center',
    gap: 3,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  bgSlotSelected: {
    borderColor: colors.pink,
    backgroundColor: 'rgba(232,114,26,0.1)',
  },
  bgSlotLocked: { opacity: 0.6 },
  bgMiniPreview: {
    width: '100%',
    height: 34,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bgMiniMid: { height: 10 },
  bgMiniGrass: { height: 8 },
  bgLockBadge: {
    position: 'absolute', top: 8, right: 2,
    backgroundColor: '#6B4020',
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  bgLockText: { fontSize: 7, color: 'white', fontWeight: '800' },
  bgClaimBadge: { position: 'absolute', top: 8, right: 2 },
  bgClaimIcon: { fontSize: 10 },
  bgSlotEmoji: { fontSize: 14 },
  bgSlotName: { fontSize: 7, color: '#8B6040', fontWeight: '600', textAlign: 'center', lineHeight: 9 },
  bgSlotNameLocked: { color: 'rgba(0,0,0,0.3)' },
  bgSelectedDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: colors.pink,
    marginTop: 2,
  },

  // Claim callout
  claimCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#E8721A',
    borderBottomWidth: 6,
    padding: 14,
    marginBottom: 20,
    gap: 10,
  },
  claimCalloutEmoji: { fontSize: 28 },
  claimCalloutTitle: { fontSize: 14, fontWeight: '900', color: '#8B4513' },
  claimCalloutSub: { fontSize: 11, color: '#A0622A', marginTop: 2 },
  claimCalloutArrow: { fontSize: 24, color: '#E8721A', fontWeight: '900' },

  // Section
  section: { marginBottom: 22 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionLabel: { fontSize: 11, color: colors.lpink, letterSpacing: 2, fontWeight: '700' },
  sectionHint: { fontSize: 11, color: colors.lgrey, fontStyle: 'italic' },

  // Locked hint
  lockedHint: {
    marginTop: 10, backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)',
  },
  lockedHintText: { fontSize: 11, color: colors.lgrey, textAlign: 'center', lineHeight: 16 },

  // Accessory Grid
  accessoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  accItem: {
    backgroundColor: '#F0DEB8',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    gap: 4,
    borderWidth: 2,
    borderColor: '#C9A878',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 90,
    justifyContent: 'center',
  },
  accItemEquipped: { backgroundColor: '#FFE8C0', borderColor: colors.pink },
  accItemClaimable: { backgroundColor: '#FFF3CD', borderColor: '#E8721A', borderWidth: 2.5 },
  accItemLocked: { opacity: 0.6 },

  levelLockBadge: {
    position: 'absolute', top: 4, right: 4,
    backgroundColor: '#6B4020', borderRadius: 6, paddingHorizontal: 5, paddingVertical: 2,
  },
  levelLockText: { fontSize: 8, color: 'white', fontWeight: '800', letterSpacing: 0.3 },
  claimBadge: { position: 'absolute', top: 3, right: 4 },
  claimBadgeIcon: { fontSize: 12 },

  accEmoji: { fontSize: 28 },
  accEmojiLocked: { opacity: 0.4 },
  accName: { fontSize: 9, color: '#8B6040', fontWeight: '600', textAlign: 'center', lineHeight: 12 },
  accNameEquipped: { color: colors.pink },
  accNameClaimable: { color: '#A05000' },
  accNameLocked: { color: 'rgba(0,0,0,0.3)' },
  levelRequireText: { fontSize: 8, color: '#8B6040', fontWeight: '700', textAlign: 'center', opacity: 0.8 },
  claimText: { fontSize: 9, color: '#E8721A', fontWeight: '900' },
  equippedBadge: {
    backgroundColor: colors.pink, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, marginTop: 2,
  },
  equippedBadgeText: { fontSize: 8, color: colors.white, fontWeight: '800', letterSpacing: 0.5 },

  // Stats
  statsGrid: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 14, padding: 10, alignItems: 'center', gap: 3,
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)',
  },
  statEmoji: { fontSize: 18 },
  statValue: { fontSize: 16, color: colors.text, fontWeight: '800' },
  statLabel: { fontSize: 9, color: colors.lgrey, textAlign: 'center', lineHeight: 12 },

  // Biomes
  biomeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  biome: { flex: 1, borderRadius: 14, padding: 10, alignItems: 'center', gap: 4, borderWidth: 1.5 },
  biomeLocked: { backgroundColor: 'rgba(0,0,0,0.05)', borderColor: 'rgba(0,0,0,0.08)' },
  biomeEmoji: { fontSize: 24 },
  biomeName: { fontSize: 9, fontWeight: '700', textAlign: 'center', lineHeight: 12 },
  biomeNameLocked: { color: colors.lgrey },
  biomeLock: { fontSize: 10 },
  biomeHint: { fontSize: 11, color: colors.lgrey, textAlign: 'center', fontStyle: 'italic' },
});

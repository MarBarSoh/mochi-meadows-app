import { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import MochiCharacter, { AccessoryId } from '@/components/MochiCharacter';

type Accessory = {
  id: AccessoryId;
  name: string;
  emoji: string;
  unlocked: boolean;
  how: string;
};

const ACCESSORIES: Accessory[] = [
  { id: 'none',     name: 'Plain',           emoji: '✨', unlocked: true,  how: 'Default look'              },
  { id: 'bow',      name: 'Pink Bow',         emoji: '🎀', unlocked: true,  how: 'Starter accessory'         },
  { id: 'cap',      name: 'Kapitan Cap',      emoji: '🧢', unlocked: false, how: 'Complete Time Travelling'  },
  { id: 'beret',    name: 'Artist Beret',     emoji: '🎓', unlocked: false, how: 'Complete Recreate the Art' },
  { id: 'hardhat',  name: 'Hardhat',          emoji: '⛑️', unlocked: false, how: 'Complete Meet the Maker'   },
  { id: 'toast',    name: 'Kaya Toast Hat',   emoji: '🍞', unlocked: false, how: 'Complete the Food Trail'   },
  { id: 'toolbelt', name: 'Toolbelt',         emoji: '🔧', unlocked: false, how: 'Complete Meet the Maker'   },
  { id: 'bag',      name: 'Rattan Bag',       emoji: '👜', unlocked: false, how: 'Visit 5 landmarks'         },
  { id: 'lantern',  name: 'Heritage Lantern', emoji: '🏮', unlocked: false, how: 'Reach Meadow Level 3'      },
];

const BIOMES = [
  { name: 'Starter\nPatch',    unlocked: true,  emoji: '🌱', color: colors.teal  },
  { name: 'Amber\nGarden',     unlocked: false, emoji: '🌻', color: colors.amber },
  { name: 'Heritage\nGrove',   unlocked: false, emoji: '🌳', color: colors.blue  },
  { name: "Maker's\nForge",    unlocked: false, emoji: '⚒️', color: colors.purple },
];

const STATS = [
  { label: 'Activities\nStarted', value: '1',    emoji: '🗺️' },
  { label: 'Stalls\nVisited',     value: '1',    emoji: '🍜' },
  { label: 'Accessories\nOwned',  value: '2',    emoji: '🎀' },
  { label: 'Meadow\nLevel',       value: 'LV 1', emoji: '🌸' },
];

function AccSlot({ acc, isEquipped, isUnlocked, onPress }: {
  acc: Accessory;
  isEquipped: boolean;
  isUnlocked: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.86, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 18, bounciness: 16 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], width: '29%' }}>
      <TouchableOpacity
        style={[
          styles.accItem,
          isEquipped && styles.accItemEquipped,
          !isUnlocked && styles.accItemLocked,
        ]}
        activeOpacity={1}
        onPressIn={isUnlocked ? pressIn : undefined}
        onPressOut={isUnlocked ? pressOut : undefined}
        onPress={onPress}
      >
        {!isUnlocked && (
          <View style={styles.lockOverlay}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        )}
        <Text style={[styles.accEmoji, !isUnlocked && styles.accEmojiLocked]}>{acc.emoji}</Text>
        <Text style={[styles.accName, isEquipped && styles.accNameEquipped, !isUnlocked && styles.accNameLocked]}>
          {acc.name}
        </Text>
        {isEquipped && (
          <View style={styles.equippedBadge}>
            <Text style={styles.equippedBadgeText}>ON</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const [equippedId, setEquippedId] = useState<AccessoryId>('bow');
  const equipped = ACCESSORIES.find(a => a.id === equippedId) ?? ACCESSORIES[1];

  // Gentle float animation for the Mochi character
  const bobAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, {
          toValue: -10,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bobAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bobAnim]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSub}>YOUR CHARACTER</Text>
          <Text style={styles.headerTitle}>My Mochi</Text>
        </View>

        {/* ── Meadow Stage ── */}
        <View style={styles.meadowStage}>

          {/* Sky section */}
          <View style={styles.skySection}>
            <Text style={styles.cloudL}>☁️  ☁️</Text>
            <Text style={styles.sunEmoji}>☀️</Text>
            <Text style={styles.cloudR}>☁️</Text>
          </View>

          {/* Mochi character floating in sky */}
          <View style={styles.characterArea}>
            <Animated.View style={{ transform: [{ translateY: bobAnim }] }}>
              <MochiCharacter accessory={equippedId} size={170} />
            </Animated.View>
            {/* Ground shadow */}
            <View style={styles.mochiShadow} />
          </View>

          {/* Name on grass level */}
          <View style={styles.nameArea}>
            <Text style={styles.mochiNameLarge}>
              {equipped.id === 'none' ? 'Plain Mochi' : `${equipped.name} Mochi`}
            </Text>
            <Text style={styles.mochiSubLabel}>Jalan Besar Explorer</Text>
          </View>

          {/* XP bar */}
          <View style={styles.xpRow}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>LV 1</Text>
            </View>
            <View style={styles.xpBarWrapper}>
              <View style={styles.xpBar}>
                <View style={[styles.xpFill, { width: '20%' }]} />
              </View>
              <Text style={styles.xpLabel}>120 / 600 XP · Level 2</Text>
            </View>
          </View>

          {/* Grass strip */}
          <View style={styles.grassStrip}>
            <Text style={styles.grassEmoji}>🌿 🌸 🌺 🌿 🌸 🌺 🌿</Text>
          </View>
        </View>

        {/* ── Accessories ── */}
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
                isUnlocked={acc.unlocked}
                onPress={() => acc.unlocked && setEquippedId(acc.id)}
              />
            ))}
          </View>
          <View style={styles.lockedHint}>
            <Text style={styles.lockedHintText}>
              🔒 Locked accessories unlock by completing activities
            </Text>
          </View>
        </View>

        {/* ── Stats ── */}
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

        {/* ── Mochi Meadow ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🌸 MOCHI MEADOW</Text>
          <View style={styles.biomeRow}>
            {BIOMES.map((b) => (
              <View
                key={b.name}
                style={[
                  styles.biome,
                  b.unlocked
                    ? { backgroundColor: b.color.bg, borderColor: b.color.light }
                    : styles.biomeLocked,
                ]}
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
  meadowStage: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#A8D8EA',
  },
  skySection: {
    backgroundColor: '#6DBFE0',
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

  characterArea: {
    backgroundColor: '#6DBFE0',
    alignItems: 'center',
    paddingTop: 6,
  },
  mochiShadow: {
    width: 120,
    height: 22,
    backgroundColor: 'rgba(20,10,0,0.22)',
    borderRadius: 60,
    marginTop: -12,
    alignSelf: 'center',
  },

  nameArea: {
    backgroundColor: '#8ACA5C',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 6,
  },
  mochiNameLarge: {
    fontSize: 22,
    color: colors.pink,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  mochiSubLabel: {
    fontSize: 12,
    color: '#3A6B1A',
    fontWeight: '600',
    marginTop: 2,
  },

  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#79BC4C',
  },
  levelBadge: {
    backgroundColor: colors.pink,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  levelText: { fontSize: 11, color: colors.white, fontWeight: '800', letterSpacing: 1 },
  xpBarWrapper: { flex: 1, gap: 5 },
  xpBar: {
    height: 7,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpFill: { height: '100%', backgroundColor: colors.pink, borderRadius: 4 },
  xpLabel: { fontSize: 10, color: '#2A5A0A', fontWeight: '600' },

  grassStrip: {
    backgroundColor: '#5BAD3F',
    paddingVertical: 10,
    alignItems: 'center',
  },
  grassEmoji: { fontSize: 18, letterSpacing: 4 },

  // Section
  section: { marginBottom: 22 },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionLabel: { fontSize: 11, color: colors.lpink, letterSpacing: 2, fontWeight: '700' },
  sectionHint: { fontSize: 11, color: colors.lgrey, fontStyle: 'italic' },

  // Accessory Grid
  accessoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  accItem: {
    backgroundColor: '#F0DEB8',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    gap: 5,
    borderWidth: 2,
    borderColor: '#C9A878',
    position: 'relative',
    overflow: 'hidden',
  },
  accItemEquipped: {
    backgroundColor: '#FFE8C0',
    borderColor: colors.pink,
  },
  accItemLocked: { opacity: 0.55 },
  lockOverlay: { position: 'absolute', top: 6, right: 6 },
  lockIcon: { fontSize: 10 },
  accEmoji: { fontSize: 30 },
  accEmojiLocked: { opacity: 0.4 },
  accName: {
    fontSize: 9,
    color: '#8B6040',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 12,
  },
  accNameEquipped: { color: colors.pink },
  accNameLocked: { color: 'rgba(0,0,0,0.3)' },
  equippedBadge: {
    backgroundColor: colors.pink,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 2,
  },
  equippedBadgeText: { fontSize: 8, color: colors.white, fontWeight: '800', letterSpacing: 0.5 },
  lockedHint: {
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  lockedHintText: { fontSize: 11, color: colors.lgrey, textAlign: 'center', lineHeight: 16 },

  // Stats
  statsGrid: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  statEmoji: { fontSize: 18 },
  statValue: { fontSize: 16, color: colors.text, fontWeight: '800' },
  statLabel: { fontSize: 9, color: colors.lgrey, textAlign: 'center', lineHeight: 12 },

  // Biomes
  biomeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  biome: {
    flex: 1,
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
  },
  biomeLocked: { backgroundColor: 'rgba(0,0,0,0.05)', borderColor: 'rgba(0,0,0,0.08)' },
  biomeEmoji: { fontSize: 24 },
  biomeName: { fontSize: 9, fontWeight: '700', textAlign: 'center', lineHeight: 12 },
  biomeNameLocked: { color: colors.lgrey },
  biomeLock: { fontSize: 10 },
  biomeHint: { fontSize: 11, color: colors.lgrey, textAlign: 'center', fontStyle: 'italic' },
});

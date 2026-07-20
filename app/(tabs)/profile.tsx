import { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PLAYER } from '@/constants/playerState';
import MochiCharacter, { AccessoryId } from '@/components/MochiCharacter';

const meadow = require('../../assets/images/meadow.png');
const mochiImg = require('../../assets/images/mochi.png');

// ── Types ─────────────────────────────────────────────────────────────────────

type SlotId = 'hat' | 'accessories' | 'clothing' | 'shoes';

type AccessoryMeta = {
  id: AccessoryId;
  label: string;
  emoji: string;
  unlockLevel: number;
  slot: SlotId;
};

// ── Accessory catalogue ───────────────────────────────────────────────────────

const ALL_ACCESSORIES: AccessoryMeta[] = [
  // Hat slot
  { id: 'none',        label: 'No Hat',              emoji: '✨', unlockLevel: 1, slot: 'hat' },
  { id: 'bow',         label: 'Pink Bow',             emoji: '🎀', unlockLevel: 1, slot: 'hat' },
  { id: 'cap',         label: 'Kapitan Cap',          emoji: '🧢', unlockLevel: 2, slot: 'hat' },
  { id: 'beret',       label: 'Artist Beret',         emoji: '🎓', unlockLevel: 3, slot: 'hat' },
  { id: 'hardhat',     label: 'Hardhat',              emoji: '⛑️', unlockLevel: 4, slot: 'hat' },
  { id: 'toast',       label: 'Toast Hat',            emoji: '🍞', unlockLevel: 5, slot: 'hat' },
  // Accessories slot
  { id: 'hairpin',     label: 'Flower Hairpin',       emoji: '🌸', unlockLevel: 4, slot: 'accessories' },
  { id: 'jade',        label: 'Jade Necklace',        emoji: '💚', unlockLevel: 5, slot: 'accessories' },
  { id: 'bracelet',    label: 'Jade Bracelet',        emoji: '💎', unlockLevel: 5, slot: 'accessories' },
  { id: 'kerosang',    label: 'Nonya Brooch',         emoji: '📿', unlockLevel: 6, slot: 'accessories' },
  { id: 'toolbelt',    label: 'Toolbelt',             emoji: '🔧', unlockLevel: 6, slot: 'accessories' },
  { id: 'bag',         label: 'Rattan Bag',           emoji: '👜', unlockLevel: 7, slot: 'accessories' },
  { id: 'gold_bangle', label: 'Gold Bangles',         emoji: '💛', unlockLevel: 8, slot: 'accessories' },
  { id: 'lantern',     label: 'Heritage Lantern',     emoji: '🏮', unlockLevel: 8, slot: 'accessories' },
  // Clothing slot
  { id: 'batik_shirt', label: 'Batik Shirt',          emoji: '👕', unlockLevel: 4, slot: 'clothing' },
  { id: 'kebaya',      label: 'Peranakan Kebaya',     emoji: '👘', unlockLevel: 6, slot: 'clothing' },
  { id: 'sarong',      label: 'Batik Sarong',         emoji: '🧵', unlockLevel: 7, slot: 'clothing' },
  { id: 'changshan',   label: 'Cheongsam',            emoji: '🥻', unlockLevel: 7, slot: 'clothing' },
  // Shoes slot
  { id: 'sneakers',    label: 'Casual Sneakers',      emoji: '👟', unlockLevel: 3, slot: 'shoes' },
  { id: 'sandals',     label: 'Traditional Sandals',  emoji: '👡', unlockLevel: 4, slot: 'shoes' },
  { id: 'slippers',    label: 'Nonya Slippers',       emoji: '🩴', unlockLevel: 5, slot: 'shoes' },
  { id: 'wedge_heels', label: 'Beaded Wedge Heels',   emoji: '👠', unlockLevel: 6, slot: 'shoes' },
];

const SLOT_CONFIG: Record<SlotId, { label: string; defaultEmoji: string; hint: string }> = {
  hat:         { label: 'Hat',         defaultEmoji: '🪖', hint: 'Headwear & hairstyles' },
  accessories: { label: 'Accessories', defaultEmoji: '📿', hint: 'Jewellery & traditional ornaments' },
  clothing:    { label: 'Clothing',    defaultEmoji: '👘', hint: 'Traditional outfits & cultural dress' },
  shoes:       { label: 'Shoes',       defaultEmoji: '👟', hint: 'Casual & traditional footwear' },
};

// ── Sub-components ────────────────────────────────────────────────────────────

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

const LEVEL_TITLE: Record<number, string> = {
  1: 'Starter Explorer',
  2: 'Neighbourhood Scout',
  3: 'Street Artist',
  4: 'Skilled Maker',
  5: 'Heritage Foodie',
  6: 'Master Craftsman',
  7: 'Rattan Weaver',
  8: 'Heritage Master',
};

function EquipSlot({
  slotId, label, emoji, isActive, onPress,
}: {
  slotId: SlotId; label: string; emoji: string; isActive: boolean; onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.slot, isActive && styles.slotActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.slotEmoji}>{emoji}</Text>
      <Text style={[styles.slotLabel, isActive && styles.slotLabelActive]}>{label}</Text>
      {isActive && <View style={styles.slotActiveDot} />}
    </TouchableOpacity>
  );
}

function AccessoryTile({
  item, isEquipped, isUnlocked, onPress,
}: {
  item: AccessoryMeta; isEquipped: boolean; isUnlocked: boolean; onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.accTile, isEquipped && styles.accTileEquipped, !isUnlocked && styles.accTileLocked]}
      onPress={isUnlocked ? onPress : undefined}
      activeOpacity={isUnlocked ? 0.7 : 1}
    >
      {isUnlocked ? (
        <MochiCharacter accessory={item.id} size={52} />
      ) : (
        <View style={styles.accTileLockedBody}>
          <Text style={styles.accTileEmoji}>{item.emoji}</Text>
          <Text style={styles.accTileLockIcon}>🔒</Text>
        </View>
      )}
      <Text style={[styles.accTileLabel, !isUnlocked && styles.accTileLabelLocked]} numberOfLines={1}>
        {item.label}
      </Text>
      {!isUnlocked && (
        <View style={styles.unlockBadge}>
          <Text style={styles.unlockBadgeText}>LV {item.unlockLevel}</Text>
        </View>
      )}
      {isEquipped && isUnlocked && (
        <View style={styles.equippedBadge}>
          <Text style={styles.equippedBadgeText}>ON</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const [activeSlot, setActiveSlot] = useState<SlotId>('hat');
  const [equipped, setEquipped] = useState<Record<SlotId, AccessoryId>>({
    hat:         'beret',
    accessories: 'hairpin',
    clothing:    'batik_shirt',
    shoes:       'sneakers',
  });

  const xpProgress = PLAYER.xpProgress;

  function getSlotEmoji(slotId: SlotId): string {
    const equippedId = equipped[slotId];
    if (equippedId === 'none') return SLOT_CONFIG[slotId].defaultEmoji;
    return ALL_ACCESSORIES.find(a => a.id === equippedId)?.emoji ?? SLOT_CONFIG[slotId].defaultEmoji;
  }

  function handleEquip(item: AccessoryMeta) {
    setEquipped(prev => ({ ...prev, [activeSlot]: item.id }));
  }

  const collectionItems = ALL_ACCESSORIES.filter(a => a.slot === activeSlot);
  const activeConfig = SLOT_CONFIG[activeSlot];

  return (
    <ImageBackground source={meadow} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.topRow}>
          <ProfileChip />
        </View>

        <View style={styles.mochiArea}>
          <Image source={mochiImg} style={styles.mochiImg} resizeMode="contain" />
          <View style={styles.shadowOval} />
        </View>

        <View style={styles.nameRow}>
          <Text style={styles.nameShadow}>NYOM</Text>
          <Text style={styles.name}>NYOM</Text>
        </View>

        <View style={styles.cardPanel}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardContent}>

            {/* Level badge + XP bar */}
            <View style={styles.levelRow}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>LV {PLAYER.level}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.levelTitle}>{LEVEL_TITLE[PLAYER.level] ?? 'Explorer'}</Text>
                <View style={styles.xpBar}>
                  <View style={[styles.xpFill, { width: `${Math.round(xpProgress * 100)}%` }]} />
                </View>
                <Text style={styles.xpHint}>{PLAYER.xpToNext} XP to LV {PLAYER.level + 1}</Text>
              </View>
            </View>

            {/* ── Equipment cross layout ── */}
            <Text style={styles.sectionLabel}>⚔️ EQUIPMENT</Text>
            <Text style={styles.sectionHint}>Tap a slot to browse its collection below</Text>

            <View style={styles.crossLayout}>
              {/* Row 1: Hat */}
              <View style={styles.crossRow}>
                <View style={styles.crossSpacer} />
                <EquipSlot
                  slotId="hat"
                  label="Hat"
                  emoji={getSlotEmoji('hat')}
                  isActive={activeSlot === 'hat'}
                  onPress={() => setActiveSlot('hat')}
                />
                <View style={styles.crossSpacer} />
              </View>

              {/* Row 2: Accessories | Mochi preview | Clothing */}
              <View style={styles.crossRow}>
                <EquipSlot
                  slotId="accessories"
                  label="Accessories"
                  emoji={getSlotEmoji('accessories')}
                  isActive={activeSlot === 'accessories'}
                  onPress={() => setActiveSlot('accessories')}
                />
                <View style={styles.centerSlot}>
                  <MochiCharacter accessory={equipped[activeSlot]} size={64} />
                </View>
                <EquipSlot
                  slotId="clothing"
                  label="Clothing"
                  emoji={getSlotEmoji('clothing')}
                  isActive={activeSlot === 'clothing'}
                  onPress={() => setActiveSlot('clothing')}
                />
              </View>

              {/* Row 3: Shoes */}
              <View style={styles.crossRow}>
                <View style={styles.crossSpacer} />
                <EquipSlot
                  slotId="shoes"
                  label="Shoes"
                  emoji={getSlotEmoji('shoes')}
                  isActive={activeSlot === 'shoes'}
                  onPress={() => setActiveSlot('shoes')}
                />
                <View style={styles.crossSpacer} />
              </View>
            </View>

            {/* ── My Collection (filtered by active slot) ── */}
            <View style={styles.collectionHeader}>
              <View>
                <Text style={styles.sectionLabel}>
                  {activeConfig.defaultEmoji} {activeConfig.label.toUpperCase()} COLLECTION
                </Text>
                <Text style={styles.collectionHint}>{activeConfig.hint}</Text>
              </View>
            </View>

            <View style={styles.accGrid}>
              {collectionItems.map(item => (
                <AccessoryTile
                  key={item.id}
                  item={item}
                  isEquipped={equipped[activeSlot] === item.id}
                  isUnlocked={item.unlockLevel <= PLAYER.level}
                  onPress={() => handleEquip(item)}
                />
              ))}
            </View>

            {/* Stats */}
            <Text style={styles.sectionLabel}>📊 STATS</Text>
            <View style={styles.statsGrid}>
              {[
                { label: 'Activities\nStarted', value: String(PLAYER.activitiesStarted) },
                { label: 'Stalls\nVisited', value: `${PLAYER.stallsDone}/${PLAYER.totalStalls}` },
                { label: 'Landmarks\nFound', value: `${PLAYER.landmarksDone}/${PLAYER.totalLandmarks}` },
                { label: 'Accessories\nOwned', value: String(PLAYER.accessoriesOwned) },
              ].map(stat => (
                <View key={stat.label} style={styles.statCard}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  topRow: { alignItems: 'flex-end', paddingHorizontal: 16, paddingTop: 8 },
  profileChip: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, shadowRadius: 4,
  },
  profileName: { fontSize: 16, fontWeight: '700', fontStyle: 'italic', color: '#1A0A00' },
  avatarCircle: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#1A0A00', alignItems: 'center', justifyContent: 'center',
  },
  avatarIcon: { fontSize: 16 },

  mochiArea: { alignItems: 'center', marginTop: 8 },
  mochiImg: { width: 150, height: 150 },
  shadowOval: {
    width: 110, height: 18, borderRadius: 55,
    backgroundColor: 'rgba(0,0,0,0.22)', marginTop: -10,
  },

  nameRow: { alignItems: 'center', height: 46, marginTop: 4 },
  nameShadow: {
    position: 'absolute', fontSize: 42, fontWeight: '900',
    fontStyle: 'italic', color: '#4A2000', top: 3,
  },
  name: {
    position: 'absolute', fontSize: 42, fontWeight: '900',
    fontStyle: 'italic', color: '#FF8C00', top: 0,
  },

  cardPanel: {
    flex: 1, marginTop: 12,
    backgroundColor: 'rgba(253,246,236,0.97)',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    overflow: 'hidden',
    borderTopWidth: 3, borderLeftWidth: 2, borderRightWidth: 2,
    borderColor: '#C9A878',
  },
  cardContent: { paddingHorizontal: 20, paddingTop: 18 },

  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  levelBadge: {
    backgroundColor: '#E8721A', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 2.5, borderColor: '#C45A00', borderBottomWidth: 5,
  },
  levelBadgeText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  levelTitle: { fontSize: 14, fontWeight: '800', color: '#3A2008', marginBottom: 6 },
  xpBar: { height: 10, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 5, overflow: 'hidden' },
  xpFill: { height: '100%', backgroundColor: '#E8721A', borderRadius: 5 },
  xpHint: { fontSize: 10, color: '#888', marginTop: 4 },

  sectionLabel: {
    fontSize: 11, color: '#E8721A', fontWeight: '800',
    letterSpacing: 1.5, marginBottom: 4,
  },
  sectionHint: { fontSize: 10, color: '#8B6040', marginBottom: 14 },

  // Cross equipment layout
  crossLayout: { marginBottom: 16, alignItems: 'center' },
  crossRow: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', gap: 10, marginBottom: 10,
  },
  crossSpacer: { width: 76, height: 76 },

  slot: {
    width: 76, height: 76, borderRadius: 16,
    backgroundColor: '#E8D5A8',
    borderWidth: 2.5, borderColor: '#B8965A', borderBottomWidth: 5,
    alignItems: 'center', justifyContent: 'center', gap: 2,
    position: 'relative',
  },
  slotActive: {
    backgroundColor: '#FFF3E0',
    borderColor: '#E8721A',
    borderBottomWidth: 5,
    shadowColor: '#E8721A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  slotEmoji: { fontSize: 26 },
  slotLabel: { fontSize: 8, color: '#6B4020', fontWeight: '700', letterSpacing: 0.2, textAlign: 'center' },
  slotLabelActive: { color: '#C45A00', fontWeight: '900' },
  slotActiveDot: {
    position: 'absolute', bottom: 5, width: 6, height: 6,
    borderRadius: 3, backgroundColor: '#E8721A',
  },

  centerSlot: {
    width: 76, height: 76, borderRadius: 18,
    backgroundColor: '#FFF5E0',
    borderWidth: 3, borderColor: '#C9A878', borderBottomWidth: 5,
    alignItems: 'center', justifyContent: 'center',
  },

  // Collection grid
  collectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 },
  collectionHint: { fontSize: 10, color: '#8B6040' },

  accGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 22 },
  accTile: {
    width: 78, borderRadius: 14,
    backgroundColor: '#FFF5E0',
    borderWidth: 2, borderColor: '#C9A878',
    alignItems: 'center', paddingTop: 6, paddingBottom: 8,
    paddingHorizontal: 4, position: 'relative',
  },
  accTileEquipped: {
    borderColor: '#E8721A', borderWidth: 3,
    backgroundColor: '#FFF3E8',
    shadowColor: '#E8721A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 4,
  },
  accTileLocked: {
    backgroundColor: 'rgba(240,234,224,0.7)',
    borderColor: 'rgba(0,0,0,0.1)', opacity: 0.75,
  },
  accTileLockedBody: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  accTileEmoji: { fontSize: 26 },
  accTileLockIcon: { fontSize: 14, marginTop: -4 },
  accTileLabel: {
    fontSize: 9, fontWeight: '700', color: '#6B4020',
    textAlign: 'center', marginTop: 4, letterSpacing: 0.2,
  },
  accTileLabelLocked: { color: '#aaa' },
  unlockBadge: {
    position: 'absolute', top: 4, right: 4,
    backgroundColor: '#3A2008', borderRadius: 6,
    paddingHorizontal: 5, paddingVertical: 2,
  },
  unlockBadgeText: { fontSize: 8, color: '#FFD080', fontWeight: '800', letterSpacing: 0.3 },
  equippedBadge: {
    position: 'absolute', top: 4, left: 4,
    backgroundColor: '#E8721A', borderRadius: 6,
    paddingHorizontal: 5, paddingVertical: 2,
  },
  equippedBadgeText: { fontSize: 8, color: 'white', fontWeight: '900' },

  // Stats
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  statCard: {
    width: '47%', backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 14, padding: 14, alignItems: 'center',
    borderWidth: 2, borderColor: '#C9A878', borderBottomWidth: 5,
  },
  statValue: { fontSize: 22, fontWeight: '900', color: '#E8721A' },
  statLabel: { fontSize: 11, color: '#6B4020', fontWeight: '600', marginTop: 2, textAlign: 'center' },
});

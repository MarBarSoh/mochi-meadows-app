import { useState, useRef, type ReactElement } from 'react';
import {
  ScrollView, View, Text, StyleSheet, TouchableOpacity,
  Animated, ImageBackground, Modal, Pressable,
} from 'react-native';
import Svg, { Rect as SvgRect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { PLAYER } from '@/constants/playerState';

const meadow = require('../../assets/images/meadow.png');

// ── QR code renderer ──────────────────────────────────────────────────────────

function buildQRGrid(code: string): boolean[][] {
  const N = 21;
  const grid: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));

  // Draw a 7×7 finder pattern at origin (or_,oc_)
  function drawFinder(or_: number, oc_: number) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isRing = r === 0 || r === 6 || c === 0 || c === 6;
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[or_ + r][oc_ + c] = isRing || isCenter;
      }
    }
  }

  drawFinder(0, 0);   // top-left
  drawFinder(0, 14);  // top-right
  drawFinder(14, 0);  // bottom-left

  // Timing patterns along row 6 and col 6
  for (let i = 8; i <= 12; i++) {
    grid[6][i] = (i % 2 === 0);
    grid[i][6] = (i % 2 === 0);
  }

  // Hash the code to seed the data area
  let seed = 1337;
  for (let i = 0; i < code.length; i++) {
    seed = (seed * 31 + code.charCodeAt(i)) & 0x7fffffff;
  }

  // Fill data area with deterministic pseudo-random
  let idx = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const inTL = r <= 7 && c <= 7;
      const inTR = r <= 7 && c >= 13;
      const inBL = r >= 13 && c <= 7;
      const isTiming = r === 6 || c === 6;
      if (inTL || inTR || inBL || isTiming) continue;
      const h = ((seed * 1664525 + idx * 22695477 + 1013904223) >>> 0);
      grid[r][c] = (h % 3) !== 0;
      idx++;
    }
  }

  return grid;
}

function QRCodeDisplay({ code, size = 168 }: { code: string; size?: number }) {
  const N = 21;
  const M = size / N;
  const grid = buildQRGrid(code);
  const rects: ReactElement[] = [];

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (grid[r][c]) {
        rects.push(
          <SvgRect
            key={`${r}-${c}`}
            x={c * M}
            y={r * M}
            width={M - 0.4}
            height={M - 0.4}
            fill="#1A0A00"
          />
        );
      }
    }
  }

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <SvgRect width={size} height={size} fill="white" />
      {rects}
    </Svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

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
    accessories: [
      { emoji: '🍞', name: 'Kaya Toast Hat' },
      { emoji: '💚', name: 'Jade Necklace' },
    ],
    xpRequired: 3500,
    claimed: false,
    claimable: false,
  },
  {
    level: 6,
    title: 'Master Craftsman',
    accessories: [
      { emoji: '👘', name: 'Kebaya Collar' },
      { emoji: '📿', name: 'Nonya Brooch' },
      { emoji: '🔧', name: 'Toolbelt' },
    ],
    xpRequired: 5000,
    claimed: false,
    claimable: false,
  },
  {
    level: 7,
    title: 'Rattan Weaver',
    accessories: [
      { emoji: '👜', name: 'Rattan Bag' },
      { emoji: '🧵', name: 'Batik Sarong' },
    ],
    xpRequired: 7000,
    claimed: false,
    claimable: false,
  },
  {
    level: 8,
    title: 'Heritage Master',
    accessories: [
      { emoji: '💛', name: 'Gold Bangles' },
      { emoji: '🏮', name: 'Heritage Lantern' },
    ],
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

type Voucher = {
  id: string;
  title: string;
  shop: string;
  discount: string;
  icon: string;
  color: string;
  darkColor: string;
  unlockLevel: number;
  claimed: boolean;
  claimable: boolean;
  expiry: string;
  howToUse: string[];
  qrCode: string;
};

const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 'swee_choon',
    title: 'Swee Choon Dim Sum',
    shop: 'Swee Choon Tim Sum Restaurant',
    discount: '$3 off any order',
    icon: '🍜',
    color: '#F7A800',
    darkColor: '#8B5800',
    unlockLevel: 2,
    claimed: true,
    claimable: false,
    expiry: '31 Dec 2026',
    howToUse: [
      'Show this QR code to the cashier before placing your order.',
      'The cashier will scan the QR code using the Mochi Meadows stall app.',
      'Discount applies to dine-in and takeaway orders.',
      'One voucher per visit. Cannot be combined with other offers.',
    ],
    qrCode: 'MOCHI-VC-SWEECHOON-2026-JB01',
  },
  {
    id: 'sungei_laksa',
    title: 'Sungei Road Laksa',
    shop: 'Sungei Road Laksa (Blk 27)',
    discount: '$2 off any bowl',
    icon: '🍲',
    color: '#E8721A',
    darkColor: '#7A3000',
    unlockLevel: 4,
    claimed: false,
    claimable: true,
    expiry: '31 Dec 2026',
    howToUse: [
      'Show this QR code to the stall owner before payment.',
      'The stall owner will scan the QR code using the Mochi Meadows stall app.',
      'Valid for any bowl of laksa.',
      'One voucher per visit. Cannot be combined with other offers.',
    ],
    qrCode: 'MOCHI-VC-SUNGEIRD-2026-JB02',
  },
  {
    id: 'beach_rd',
    title: 'Beach Road Curry Rice',
    shop: 'Beach Road Ghanaian Curry Rice',
    discount: '$2 off any set meal',
    icon: '🍛',
    color: '#0F6E56',
    darkColor: '#04342C',
    unlockLevel: 5,
    claimed: false,
    claimable: false,
    expiry: '31 Dec 2026',
    howToUse: [
      'Show this QR code to the stall owner before payment.',
      'The stall owner will scan the QR code using the Mochi Meadows stall app.',
      'Valid for any set meal including rice.',
      'One voucher per visit.',
    ],
    qrCode: 'MOCHI-VC-BEACHRDCURRY-2026-JB03',
  },
  {
    id: 'heritage_trades',
    title: 'Heritage Trades Voucher',
    shop: 'Rad Son Lighting or Rattan Workshop',
    discount: '$5 off any purchase',
    icon: '🏮',
    color: '#534AB7',
    darkColor: '#26215C',
    unlockLevel: 6,
    claimed: false,
    claimable: false,
    expiry: '31 Dec 2026',
    howToUse: [
      'Valid at Rad Son Lighting or the Jalan Besar Rattan Workshop.',
      'Show this QR code to the shop owner before payment.',
      'Minimum spend of $10 required.',
      'One voucher per visit. Not valid during sale periods.',
    ],
    qrCode: 'MOCHI-VC-HERITAGETRADES-2026-JB04',
  },
  {
    id: 'jb_explorer',
    title: 'Jalan Besar Explorer Reward',
    shop: 'Any Mochi Meadows partner shop',
    discount: '10% off storewide',
    icon: '🏅',
    color: '#185FA5',
    darkColor: '#0C447C',
    unlockLevel: 8,
    claimed: false,
    claimable: false,
    expiry: '31 Dec 2026',
    howToUse: [
      'Valid at all Mochi Meadows partner shops in Jalan Besar.',
      'Show this QR code to the shop owner before payment.',
      'Applies to the full purchase amount.',
      'One voucher per visit. Cannot be combined with other vouchers.',
    ],
    qrCode: 'MOCHI-VC-JBEXPLORER-2026-JB05',
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

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

function VoucherModal({ voucher, onClose }: { voucher: Voucher; onClose: () => void }) {
  return (
    <Modal visible transparent animationType="slide">
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.voucherModal} onPress={() => {}}>
          {/* Header */}
          <View style={[styles.voucherModalHeader, { backgroundColor: voucher.color }]}>
            <Text style={styles.voucherModalIcon}>{voucher.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.voucherModalTitle}>{voucher.title}</Text>
              <Text style={styles.voucherModalShop}>{voucher.shop}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.voucherModalBody} showsVerticalScrollIndicator={false}>
            {/* QR code */}
            <View style={styles.qrWrapper}>
              <QRCodeDisplay code={voucher.qrCode} size={180} />
            </View>
            <Text style={styles.qrHint}>Show to stall owner for scanning</Text>

            {/* Discount pill */}
            <View style={[styles.discountPill, { borderColor: voucher.color }]}>
              <Text style={[styles.discountPillText, { color: voucher.darkColor }]}>
                💰  {voucher.discount}
              </Text>
            </View>

            <View style={styles.voucherDivider} />

            {/* How to use */}
            <Text style={styles.howToUseTitle}>📋  HOW TO USE</Text>
            {voucher.howToUse.map((step, i) => (
              <View key={i} style={styles.howToUseRow}>
                <View style={[styles.stepDot, { backgroundColor: voucher.color }]}>
                  <Text style={styles.stepDotNum}>{i + 1}</Text>
                </View>
                <Text style={styles.howToUseText}>{step}</Text>
              </View>
            ))}

            <View style={styles.voucherDivider} />

            {/* Expiry + note */}
            <View style={styles.expiryRow}>
              <Text style={styles.expiryLabel}>Valid until</Text>
              <Text style={styles.expiryDate}>{voucher.expiry}</Text>
            </View>

            <View style={styles.screenshotNote}>
              <Text style={styles.screenshotNoteText}>
                📱  Screenshot this screen to save your voucher for offline use
              </Text>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function RewardsScreen() {
  const [levels, setLevels] = useState<LevelReward[]>(INITIAL_LEVELS);
  const [vouchers, setVouchers] = useState<Voucher[]>(INITIAL_VOUCHERS);
  const [justClaimed, setJustClaimed] = useState<number | null>(null);
  const [activeVoucher, setActiveVoucher] = useState<Voucher | null>(null);

  const xpProgress = PLAYER.xpProgress;

  const handleClaimMilestone = (levelNum: number) => {
    setLevels(prev =>
      prev.map(l => l.level === levelNum ? { ...l, claimed: true, claimable: false } : l)
    );
    setJustClaimed(levelNum);
    setTimeout(() => setJustClaimed(null), 3000);
  };

  const handleClaimVoucher = (id: string) => {
    setVouchers(prev =>
      prev.map(v => v.id === id ? { ...v, claimed: true, claimable: false } : v)
    );
    // open the QR immediately after claiming
    const claimed = vouchers.find(v => v.id === id);
    if (claimed) setActiveVoucher({ ...claimed, claimed: true, claimable: false });
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

            {/* ── Jalan Besar Vouchers ─────────────────────────────────── */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>🎟️ JALAN BESAR VOUCHERS</Text>
              <Text style={styles.sectionSub}>
                Earn vouchers as you level up — redeem them at real Jalan Besar shops!
              </Text>

              {vouchers.map((v) => {
                const isLocked = !v.claimed && !v.claimable;
                const isRedeemable = v.claimed;
                const xpNeeded = PLAYER.level >= v.unlockLevel ? 0 : v.unlockLevel - PLAYER.level;

                return (
                  <TouchableOpacity
                    key={v.id}
                    style={[
                      styles.voucherCard,
                      isRedeemable && styles.voucherCardActive,
                      v.claimable && styles.voucherCardClaimable,
                      isLocked && styles.voucherCardLocked,
                    ]}
                    onPress={isRedeemable ? () => setActiveVoucher(v) : undefined}
                    activeOpacity={isRedeemable ? 0.75 : 1}
                  >
                    <View style={[styles.voucherIconCircle, { backgroundColor: isLocked ? '#ccc' : v.color }]}>
                      <Text style={styles.voucherIcon}>{isLocked ? '🔒' : v.icon}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.voucherTitle, isLocked && { color: '#aaa' }]}>{v.title}</Text>
                      <Text style={[styles.voucherDiscount, isLocked && { color: '#bbb' }]}>{v.discount}</Text>
                      {isLocked && (
                        <Text style={styles.voucherLockHint}>
                          Unlocks at Level {v.unlockLevel}
                          {xpNeeded > 0 ? ` (${xpNeeded} levels away)` : ''}
                        </Text>
                      )}
                    </View>
                    {isRedeemable && (
                      <View style={[styles.voucherQRBadge, { backgroundColor: v.color }]}>
                        <Text style={styles.voucherQRBadgeText}>View QR</Text>
                      </View>
                    )}
                    {v.claimable && (
                      <TouchableOpacity
                        style={[styles.voucherClaimBtn, { borderColor: v.color }]}
                        onPress={() => handleClaimVoucher(v.id)}
                      >
                        <Text style={[styles.voucherClaimBtnText, { color: v.darkColor }]}>Claim</Text>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ── Level milestones ─────────────────────────────────────── */}
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
                      <Text style={[styles.milestoneLevelNum, isLocked && styles.milestoneLevelNumLocked]}>
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
                          <View key={acc.name} style={[styles.accChip, isLocked && styles.accChipLocked]}>
                            <Text style={[styles.accChipEmoji, isLocked && { opacity: 0.4 }]}>{acc.emoji}</Text>
                            <Text style={[styles.accChipName, isLocked && styles.accChipNameLocked]}>{acc.name}</Text>
                          </View>
                        ))}
                      </View>

                      {lvl.claimable && (
                        <ClaimButton onClaim={() => handleClaimMilestone(lvl.level)} />
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

      {/* QR voucher modal */}
      {activeVoucher && (
        <VoucherModal voucher={activeVoucher} onClose={() => setActiveVoucher(null)} />
      )}
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

  // Level card
  levelCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20, padding: 18, marginBottom: 24,
    borderWidth: 3, borderColor: '#6B4020', borderBottomWidth: 6,
  },
  levelCardTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  levelBadgeLarge: {
    backgroundColor: colors.pink, borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 2.5, borderColor: '#C45A00', borderBottomWidth: 5,
  },
  levelBadgeText: { fontSize: 16, color: colors.white, fontWeight: '900', letterSpacing: 0.5 },
  levelTitle: { fontSize: 16, color: '#3A2008', fontWeight: '800' },
  levelXPText: { fontSize: 12, color: colors.lgrey, marginTop: 2 },
  nextLevelLabel: { fontSize: 13, color: colors.lpink, fontWeight: '700' },
  levelProgressBar: {
    height: 14, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 7,
    overflow: 'hidden', borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.1)',
  },
  levelProgressFill: { height: '100%', backgroundColor: colors.pink, borderRadius: 7 },
  levelProgressHint: { fontSize: 11, color: colors.lgrey, marginTop: 8, textAlign: 'center' },
  celebrationBanner: {
    marginTop: 12, backgroundColor: '#FFF3CD', borderRadius: 12,
    padding: 10, borderWidth: 2, borderColor: '#E8721A',
  },
  celebrationText: { fontSize: 13, color: '#8B4513', fontWeight: '700', textAlign: 'center' },

  // Section
  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 11, color: colors.lpink, letterSpacing: 2, fontWeight: '700', marginBottom: 6 },
  sectionSub: { fontSize: 12, color: '#8B6040', marginBottom: 14, lineHeight: 17 },

  // Voucher cards
  voucherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 4,
  },
  voucherCardActive: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#C9A878',
    borderBottomWidth: 5,
  },
  voucherCardClaimable: {
    backgroundColor: '#FFF9EE',
    borderColor: '#E8721A',
    borderBottomWidth: 5,
  },
  voucherCardLocked: {
    opacity: 0.6,
    backgroundColor: 'rgba(240,234,224,0.6)',
    borderBottomWidth: 2,
  },
  voucherIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  voucherIcon: { fontSize: 22 },
  voucherTitle: { fontSize: 13, fontWeight: '800', color: '#2A1200', marginBottom: 3 },
  voucherDiscount: { fontSize: 12, color: '#6B4020', fontWeight: '600' },
  voucherLockHint: { fontSize: 10, color: '#aaa', marginTop: 3 },
  voucherQRBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  voucherQRBadgeText: { fontSize: 11, color: 'white', fontWeight: '800' },
  voucherClaimBtn: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 2,
    backgroundColor: '#FFFEF8',
  },
  voucherClaimBtnText: { fontSize: 12, fontWeight: '800' },

  // Milestone cards
  milestoneCard: {
    flexDirection: 'row', gap: 14, borderRadius: 18, padding: 14,
    marginBottom: 10, borderWidth: 3, borderBottomWidth: 6, alignItems: 'flex-start',
  },
  milestoneCardClaimed: { backgroundColor: '#F0FAF0', borderColor: '#A0C878' },
  milestoneCardClaimable: { backgroundColor: '#FFF3CD', borderColor: '#E8721A' },
  milestoneCardLocked: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderColor: 'rgba(0,0,0,0.12)',
    borderBottomWidth: 3, opacity: 0.75,
  },
  milestoneLevelCircle: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  milestoneLevelCircleClaimed: { backgroundColor: '#5BAD3F' },
  milestoneLevelCircleClaimable: { backgroundColor: colors.pink },
  milestoneLevelCircleLocked: { backgroundColor: 'rgba(0,0,0,0.08)' },
  milestoneLevelNum: { fontSize: 16, color: colors.white, fontWeight: '900' },
  milestoneLevelNumLocked: { color: colors.lgrey },
  milestoneTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
  milestoneTitle: { fontSize: 13, fontWeight: '800', flex: 1 },
  claimedPill: { backgroundColor: '#5BAD3F', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  claimedPillText: { fontSize: 9, color: 'white', fontWeight: '800', letterSpacing: 0.3 },
  lockedPill: { backgroundColor: 'rgba(0,0,0,0.07)', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  lockedPillText: { fontSize: 9, color: colors.lgrey, fontWeight: '700' },
  accRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  accChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 6,
    borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.1)',
  },
  accChipLocked: { backgroundColor: 'rgba(0,0,0,0.04)', borderColor: 'rgba(0,0,0,0.06)' },
  accChipEmoji: { fontSize: 18 },
  accChipName: { fontSize: 12, color: '#3A2008', fontWeight: '600' },
  accChipNameLocked: { color: colors.lgrey },
  claimBtn: {
    backgroundColor: '#FFFEF8', borderRadius: 18,
    borderWidth: 3, borderColor: '#6B4020', borderBottomWidth: 7,
    paddingVertical: 12, alignItems: 'center',
  },
  claimBtnText: { color: '#3A2008', fontWeight: '900', fontSize: 15, letterSpacing: 0.3 },

  // XP sources
  xpSourceCard: {
    backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 18, padding: 16,
    borderWidth: 3, borderColor: '#6B4020', borderBottomWidth: 6, gap: 12,
  },
  xpSourceRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  xpSourceEmoji: { fontSize: 22, width: 30, textAlign: 'center' },
  xpSourceAction: { flex: 1, fontSize: 13, color: '#3A2008', fontWeight: '600' },
  xpSourceBadge: {
    backgroundColor: colors.amber.bg, borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1.5, borderColor: colors.amber.light,
  },
  xpSourceXP: { fontSize: 12, color: colors.amber.dark, fontWeight: '800' },

  // QR Voucher modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  voucherModal: {
    backgroundColor: '#FFFDF7',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '88%',
    overflow: 'hidden',
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#C9A878',
  },
  voucherModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 18,
    paddingBottom: 16,
  },
  voucherModalIcon: { fontSize: 32 },
  voucherModalTitle: { fontSize: 16, fontWeight: '900', color: 'white' },
  voucherModalShop: { fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },

  voucherModalBody: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 20, alignItems: 'center' },
  qrWrapper: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#C9A878',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  qrHint: { fontSize: 11, color: '#8B6040', marginTop: 10, marginBottom: 16 },
  discountPill: {
    borderWidth: 2.5,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  discountPillText: { fontSize: 17, fontWeight: '900' },
  voucherDivider: {
    width: '100%',
    height: 1.5,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: 16,
  },
  howToUseTitle: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#8B6040',
    marginBottom: 12,
  },
  howToUseRow: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'stretch',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepDotNum: { fontSize: 11, color: 'white', fontWeight: '900' },
  howToUseText: { flex: 1, fontSize: 13, color: '#3A2008', lineHeight: 19, fontWeight: '500' },
  expiryRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiryLabel: { fontSize: 12, color: '#8B6040', fontWeight: '600' },
  expiryDate: { fontSize: 13, color: '#3A2008', fontWeight: '800' },
  screenshotNote: {
    marginTop: 16,
    backgroundColor: '#FFF9EE',
    borderRadius: 12,
    padding: 12,
    alignSelf: 'stretch',
    borderWidth: 1.5,
    borderColor: '#E8D5A8',
  },
  screenshotNoteText: { fontSize: 12, color: '#6B4020', fontWeight: '600', textAlign: 'center', lineHeight: 18 },
});

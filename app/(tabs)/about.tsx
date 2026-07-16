import { useState } from 'react';
import {
  ScrollView, View, Text, StyleSheet, TouchableOpacity,
  ImageBackground, Modal, Pressable, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PLAYER } from '@/constants/playerState';
import MochiCharacter, { AccessoryId } from '@/components/MochiCharacter';

const meadow = require('../../assets/images/meadow.png');

// ── Fake friends data ─────────────────────────────────────────────────────────

type Friend = {
  id: string;
  name: string;
  level: number;
  xp: number;
  color: string;
  darkColor: string;
  accessory: AccessoryId;
  mapX: number;  // position on Jalan Besar map (0-1 fraction)
  mapY: number;
  isOnline: boolean;
  lastSeen: string;
  stallsDone: number;
  landmarksDone: number;
  muralsDone: number;
  shopsDone: number;
  completedLocations: string[];
  weeklyXP: number;
};

const FRIENDS: Friend[] = [
  {
    id: 'rayden',
    name: 'Rayden',
    level: 5,
    xp: 3900,
    color: '#E8721A',
    darkColor: '#A34800',
    accessory: 'cap',
    mapX: 0.575,
    mapY: 0.22,
    isOnline: true,
    lastSeen: 'Now',
    stallsDone: 3,
    landmarksDone: 3,
    muralsDone: 2,
    shopsDone: 1,
    completedLocations: ['Swee Choon Dim Sum', 'Sungei Road Laksa', 'Beach Road Curry Rice', 'Jalan Besar Stadium', 'Former SCGS', 'Rochor Centre'],
    weeklyXP: 1150,
  },
  {
    id: 'rynee',
    name: 'Rynee',
    level: 3,
    xp: 1500,
    color: '#534AB7',
    darkColor: '#26215C',
    accessory: 'beret',
    mapX: 0.30,
    mapY: 0.73,
    isOnline: true,
    lastSeen: '5 min ago',
    stallsDone: 1,
    landmarksDone: 0,
    muralsDone: 3,
    shopsDone: 0,
    completedLocations: ['Swee Choon Dim Sum', 'FC Mural', 'Heritage Trades Mural', 'Peranakan Mural'],
    weeklyXP: 550,
  },
  {
    id: 'richard',
    name: 'Richard',
    level: 2,
    xp: 720,
    color: '#185FA5',
    darkColor: '#0C447C',
    accessory: 'none',
    mapX: 0.41,
    mapY: 0.44,
    isOnline: false,
    lastSeen: '2h ago',
    stallsDone: 0,
    landmarksDone: 2,
    muralsDone: 0,
    shopsDone: 0,
    completedLocations: ['Jalan Besar Stadium', 'Petain Road Shophouses'],
    weeklyXP: 300,
  },
  {
    id: 'jammy',
    name: 'Jammy',
    level: 4,
    xp: 2800,
    color: '#0F6E56',
    darkColor: '#04342C',
    accessory: 'hardhat',
    mapX: 0.67,
    mapY: 0.56,
    isOnline: false,
    lastSeen: 'Yesterday',
    stallsDone: 2,
    landmarksDone: 1,
    muralsDone: 1,
    shopsDone: 3,
    completedLocations: ['Swee Choon Dim Sum', 'Sungei Road Laksa', 'Jalan Besar Stadium', 'FC Mural', 'Rad Son Lighting', 'Heritage Hardware', 'Rattan Workshop'],
    weeklyXP: 880,
  },
];

// ── Map pins ──────────────────────────────────────────────────────────────────

type Pin = {
  id: string;
  emoji: string;
  label: string;
  x: number; // 0-1 fraction of map width
  y: number;
  type: 'food' | 'time' | 'art' | 'maker';
  done?: boolean;
};

const MAP_PINS: Pin[] = [
  // Food trail
  { id: 'swee', emoji: '🍜', label: 'Swee Choon Dim Sum', x: 0.582, y: 0.18, type: 'food', done: true },
  { id: 'sungei', emoji: '🍜', label: 'Sungei Road Laksa', x: 0.20, y: 0.55, type: 'food' },
  { id: 'beach', emoji: '🍛', label: 'Beach Road Curry Rice', x: 0.80, y: 0.65, type: 'food' },
  // Time travelling
  { id: 'stadium', emoji: '🏟️', label: 'Jalan Besar Stadium', x: 0.41, y: 0.38, type: 'time' },
  { id: 'scgs', emoji: '🏫', label: 'Former SCGS Building', x: 0.73, y: 0.12, type: 'time' },
  { id: 'rochor', emoji: '🏙️', label: 'Rochor Centre (site)', x: 0.14, y: 0.14, type: 'time' },
  { id: 'petain', emoji: '🏠', label: 'Petain Road Shophouses', x: 0.31, y: 0.78, type: 'time' },
  // Art
  { id: 'fcmural', emoji: '⚽', label: 'Jalan Besar FC Mural', x: 0.46, y: 0.30, type: 'art' },
  { id: 'heritagewall', emoji: '🎨', label: 'Heritage Trades Mural', x: 0.64, y: 0.26, type: 'art' },
  // Maker
  { id: 'radson', emoji: '💡', label: 'Rad Son Lighting', x: 0.67, y: 0.52, type: 'maker' },
  { id: 'rattan', emoji: '🧺', label: 'Rattan Workshop', x: 0.25, y: 0.87, type: 'maker' },
];

const PIN_COLORS: Record<Pin['type'], string> = {
  food: '#BA7517',
  time: '#185FA5',
  art: '#534AB7',
  maker: '#0F6E56',
};

// ── Leaderboard ───────────────────────────────────────────────────────────────

const LEADERBOARD = [
  { name: 'Rayden', level: 5, weeklyXP: 1150, color: '#E8721A', rank: 1 },
  { name: 'Jammy', level: 4, weeklyXP: 880, color: '#0F6E56', rank: 2 },
  { name: 'Matthew', level: PLAYER.level, weeklyXP: 640, color: '#D4708A', rank: 3 },
  { name: 'Rynee', level: 3, weeklyXP: 550, color: '#534AB7', rank: 4 },
  { name: 'Richard', level: 2, weeklyXP: 300, color: '#185FA5', rank: 5 },
];

const RANK_MEDALS = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

// ── Group challenge ───────────────────────────────────────────────────────────

const GROUP_CHALLENGE = {
  title: 'Jalan Besar Explorer',
  desc: 'All 5 group members visit at least 1 heritage stall this week',
  deadline: 'Ends Sunday 11:59 PM',
  members: [
    { name: 'Rayden', done: true },
    { name: 'Jammy', done: true },
    { name: 'Matthew', done: true },
    { name: 'Rynee', done: false },
    { name: 'Richard', done: false },
  ],
  reward: 'Exclusive Group Badge + 300 XP each',
};

// ── Map component ─────────────────────────────────────────────────────────────

const MAP_W = 340;
const MAP_H = 220;

function JalanBesarMap({
  onFriendPress,
  onPinPress,
}: {
  onFriendPress: (f: Friend) => void;
  onPinPress: (p: Pin) => void;
}) {
  return (
    <View style={mapStyles.container}>
      {/* Road grid */}
      {/* Horizontal roads */}
      <View style={[mapStyles.road, { top: 30, left: 0, width: MAP_W, height: 6 }]} />
      <View style={[mapStyles.road, { top: 88, left: 0, width: MAP_W, height: 5 }]} />
      <View style={[mapStyles.road, { top: 148, left: 0, width: MAP_W, height: 5 }]} />
      <View style={[mapStyles.road, { top: 200, left: 0, width: MAP_W, height: 4 }]} />
      {/* Vertical roads */}
      <View style={[mapStyles.road, { left: 90, top: 0, width: 5, height: MAP_H }]} />
      <View style={[mapStyles.road, { left: 195, top: 0, width: 6, height: MAP_H }]} />
      <View style={[mapStyles.road, { left: 280, top: 0, width: 4, height: MAP_H }]} />

      {/* Road labels */}
      <Text style={[mapStyles.roadLabel, { top: 20, left: 4 }]}>Lavender St</Text>
      <Text style={[mapStyles.roadLabel, { top: 78, left: 4 }]}>Tyrwhitt Rd</Text>
      <Text style={[mapStyles.roadLabel, { top: 138, left: 4 }]}>Kitchener Rd</Text>
      <Text style={[mapStyles.roadLabel, { top: 190, left: 4 }]}>Rochor Rd</Text>
      <Text style={[mapStyles.roadLabel, { top: 8, left: 198, width: 60 }]}>Jalan{'\n'}Besar Rd</Text>

      {/* Stadium block */}
      <View style={[mapStyles.landmark, { left: 115, top: 96, width: 70, height: 48, backgroundColor: '#1E4A2A' }]} />
      <Text style={[mapStyles.landmarkLabel, { left: 130, top: 113 }]}>Stadium</Text>

      {/* Berseh block */}
      <View style={[mapStyles.landmark, { left: 202, top: 35, width: 70, height: 48, backgroundColor: '#1A2E4A' }]} />

      {/* Activity pins */}
      {MAP_PINS.map(pin => (
        <TouchableOpacity
          key={pin.id}
          style={[mapStyles.pin, {
            left: pin.x * MAP_W - 12,
            top: pin.y * MAP_H - 12,
            backgroundColor: PIN_COLORS[pin.type],
            borderWidth: pin.done ? 2 : 1,
            borderColor: pin.done ? '#fff' : 'rgba(255,255,255,0.4)',
          }]}
          onPress={() => onPinPress(pin)}
          activeOpacity={0.8}
        >
          <Text style={mapStyles.pinEmoji}>{pin.emoji}</Text>
        </TouchableOpacity>
      ))}

      {/* Player's own marker */}
      <View style={[mapStyles.selfMarker, { left: 0.54 * MAP_W - 16, top: 0.42 * MAP_H - 16 }]}>
        <Text style={{ fontSize: 10 }}>🍡</Text>
      </View>
      <Text style={[mapStyles.markerLabel, { left: 0.54 * MAP_W - 22, top: 0.42 * MAP_H + 12, color: '#D4708A' }]}>You</Text>

      {/* Friend markers */}
      {FRIENDS.map(f => (
        <TouchableOpacity
          key={f.id}
          style={[mapStyles.friendMarker, {
            left: f.mapX * MAP_W - 14,
            top: f.mapY * MAP_H - 14,
            backgroundColor: f.color,
            opacity: f.isOnline ? 1 : 0.65,
          }]}
          onPress={() => onFriendPress(f)}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 9, color: '#fff', fontWeight: '800' }}>{f.name[0]}</Text>
          {f.isOnline && <View style={mapStyles.onlineDot} />}
        </TouchableOpacity>
      ))}
      {FRIENDS.map(f => (
        <Text
          key={f.id + '_label'}
          style={[mapStyles.markerLabel, {
            left: f.mapX * MAP_W - 18,
            top: f.mapY * MAP_H + 14,
            color: f.color,
          }]}
          numberOfLines={1}
        >
          {f.name}
        </Text>
      ))}
    </View>
  );
}

// ── Friend detail modal ───────────────────────────────────────────────────────

function FriendModal({ friend, onClose }: { friend: Friend | null; onClose: () => void }) {
  if (!friend) return null;
  const total = friend.stallsDone + friend.landmarksDone + friend.muralsDone + friend.shopsDone;
  return (
    <Modal visible={!!friend} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={modalStyles.backdrop} onPress={onClose}>
        <Pressable style={modalStyles.sheet} onPress={e => e.stopPropagation()}>
          {/* Header */}
          <View style={[modalStyles.header, { backgroundColor: friend.color }]}>
            <MochiCharacter accessory={friend.accessory} size={72} />
            <View style={{ flex: 1 }}>
              <View style={modalStyles.onlineRow}>
                <View style={[modalStyles.onlineBadge, { backgroundColor: friend.isOnline ? '#22c55e' : '#888' }]}>
                  <Text style={modalStyles.onlineText}>{friend.isOnline ? '● ONLINE' : '○ OFFLINE'}</Text>
                </View>
                <Text style={modalStyles.lastSeen}>{friend.lastSeen}</Text>
              </View>
              <Text style={modalStyles.friendName}>{friend.name}</Text>
              <Text style={modalStyles.friendLevel}>LV {friend.level} · {friend.xp.toLocaleString()} XP</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={modalStyles.statsRow}>
            {[
              { label: 'Stalls', val: friend.stallsDone, max: 3, color: '#BA7517' },
              { label: 'Landmarks', val: friend.landmarksDone, max: 5, color: '#185FA5' },
              { label: 'Murals', val: friend.muralsDone, max: 4, color: '#534AB7' },
              { label: 'Shops', val: friend.shopsDone, max: 3, color: '#0F6E56' },
            ].map(s => (
              <View key={s.label} style={modalStyles.statCell}>
                <Text style={[modalStyles.statNum, { color: s.color }]}>{s.val}/{s.max}</Text>
                <Text style={modalStyles.statLbl}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Completed locations */}
          <Text style={modalStyles.secLabel}>📍 RECENTLY EXPLORED</Text>
          <View style={modalStyles.locationList}>
            {friend.completedLocations.slice(0, 4).map(loc => (
              <View key={loc} style={[modalStyles.locationChip, { borderColor: friend.color }]}>
                <Text style={[modalStyles.locationChipText, { color: friend.darkColor }]}>{loc}</Text>
              </View>
            ))}
            {friend.completedLocations.length > 4 && (
              <View style={[modalStyles.locationChip, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                <Text style={modalStyles.locationChipText}>+{friend.completedLocations.length - 4} more</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[modalStyles.closeBtn, { backgroundColor: friend.color }]}
            onPress={onClose}
          >
            <Text style={modalStyles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ── Pin detail modal ──────────────────────────────────────────────────────────

function PinModal({ pin, onClose }: { pin: Pin | null; onClose: () => void }) {
  if (!pin) return null;
  const typeLabel = { food: 'FOOD TRAIL', time: 'TIME TRAVELLING', art: 'RECREATE THE ART', maker: 'MEET THE MAKER' }[pin.type];
  const color = PIN_COLORS[pin.type];
  const friendsHere = FRIENDS.filter(f => Math.abs(f.mapX - pin.x) < 0.15 && Math.abs(f.mapY - pin.y) < 0.2);
  return (
    <Modal visible={!!pin} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={modalStyles.backdrop} onPress={onClose}>
        <Pressable style={[modalStyles.sheet, { paddingTop: 0 }]} onPress={e => e.stopPropagation()}>
          <View style={[modalStyles.pinHeader, { backgroundColor: color }]}>
            <Text style={modalStyles.pinEmojiBig}>{pin.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={modalStyles.pinType}>{typeLabel}</Text>
              <Text style={modalStyles.pinName}>{pin.label}</Text>
            </View>
            {pin.done && <View style={modalStyles.doneBadge}><Text style={modalStyles.doneText}>✓ Done</Text></View>}
          </View>

          {friendsHere.length > 0 && (
            <View style={modalStyles.friendsHereSection}>
              <Text style={[modalStyles.secLabel, { marginBottom: 8 }]}>👥 FRIENDS NEARBY</Text>
              {friendsHere.map(f => (
                <View key={f.id} style={modalStyles.friendHereRow}>
                  <View style={[modalStyles.friendDot, { backgroundColor: f.color }]} />
                  <Text style={modalStyles.friendHereName}>{f.name}</Text>
                  <Text style={modalStyles.friendHereLast}>{f.lastSeen}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={modalStyles.heatRow}>
            <Text style={[modalStyles.heatLabel, { color }]}>🔥 Activity today: </Text>
            <Text style={modalStyles.heatValue}>
              {pin.id === 'swee' ? '12 players' : pin.id === 'stadium' ? '7 players' : pin.id === 'fcmural' ? '5 players' : '3 players'}
            </Text>
          </View>

          <TouchableOpacity
            style={[modalStyles.closeBtn, { backgroundColor: color, marginTop: 12 }]}
            onPress={onClose}
          >
            <Text style={modalStyles.closeBtnText}>Got it</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function SocialMeadowScreen() {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

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

        {/* Page title */}
        <View style={styles.pageTitle}>
          <Text style={styles.pageTitleShadow}>SOCIAL MEADOW</Text>
          <Text style={styles.pageTitleText}>SOCIAL MEADOW</Text>
        </View>

        {/* Card panel */}
        <View style={styles.cardPanel}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

            {/* Map section */}
            <Text style={styles.sectionLabel}>🗺️ JALAN BESAR — LIVE MAP</Text>
            <View style={styles.mapCard}>
              <JalanBesarMap
                onFriendPress={setSelectedFriend}
                onPinPress={setSelectedPin}
              />
              {/* Map legend */}
              <View style={styles.legend}>
                {[
                  { color: '#BA7517', label: 'Food' },
                  { color: '#185FA5', label: 'History' },
                  { color: '#534AB7', label: 'Art' },
                  { color: '#0F6E56', label: 'Maker' },
                ].map(l => (
                  <View key={l.label} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                    <Text style={styles.legendText}>{l.label}</Text>
                  </View>
                ))}
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#D4708A' }]} />
                  <Text style={styles.legendText}>Friends</Text>
                </View>
              </View>
              <Text style={styles.mapHint}>Tap any marker or pin to see details</Text>
            </View>

            {/* Online friends strip */}
            <Text style={styles.sectionLabel}>👥 FRIENDS ({FRIENDS.filter(f => f.isOnline).length} online)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.friendsScroll}>
              {FRIENDS.map(f => (
                <TouchableOpacity
                  key={f.id}
                  style={[styles.friendCard, { borderColor: f.color }]}
                  onPress={() => setSelectedFriend(f)}
                  activeOpacity={0.85}
                >
                  <View style={styles.friendAvatarWrap}>
                    <MochiCharacter accessory={f.accessory} size={56} />
                    <View style={[styles.statusDot, { backgroundColor: f.isOnline ? '#22c55e' : '#888' }]} />
                  </View>
                  <Text style={[styles.friendName, { color: f.darkColor }]}>{f.name}</Text>
                  <View style={[styles.friendLvBadge, { backgroundColor: f.color }]}>
                    <Text style={styles.friendLvText}>LV {f.level}</Text>
                  </View>
                  <Text style={styles.friendLastSeen}>{f.lastSeen}</Text>
                  <View style={styles.friendProgressRow}>
                    <Text style={styles.friendProgressText}>🍜{f.stallsDone} 📸{f.landmarksDone} 🎨{f.muralsDone} 🔧{f.shopsDone}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Group challenge */}
            <Text style={styles.sectionLabel}>⚡ GROUP CHALLENGE</Text>
            <View style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <Text style={styles.challengeTitle}>{GROUP_CHALLENGE.title}</Text>
                <View style={styles.deadlinePill}>
                  <Text style={styles.deadlineText}>{GROUP_CHALLENGE.deadline}</Text>
                </View>
              </View>
              <Text style={styles.challengeDesc}>{GROUP_CHALLENGE.desc}</Text>
              <View style={styles.challengeMembersRow}>
                {GROUP_CHALLENGE.members.map(m => (
                  <View key={m.name} style={styles.challengeMember}>
                    <View style={[styles.challengeMemberDot, { backgroundColor: m.done ? '#22c55e' : '#ddd' }]}>
                      <Text style={styles.challengeMemberCheck}>{m.done ? '✓' : '○'}</Text>
                    </View>
                    <Text style={[styles.challengeMemberName, { color: m.done ? '#22c55e' : '#888' }]}>{m.name}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.challengeRewardRow}>
                <Text style={styles.challengeRewardLabel}>🏆 REWARD</Text>
                <Text style={styles.challengeRewardText}>{GROUP_CHALLENGE.reward}</Text>
              </View>
              <Text style={styles.challengeProgress}>3/5 members done — almost there!</Text>
            </View>

            {/* Weekly leaderboard */}
            <Text style={styles.sectionLabel}>🏆 WEEKLY LEADERBOARD</Text>
            <View style={styles.leaderboardCard}>
              <Text style={styles.leaderboardPeriod}>Week of 14–20 July 2026</Text>
              {LEADERBOARD.map((entry, i) => (
                <View
                  key={entry.name}
                  style={[
                    styles.leaderboardRow,
                    entry.name === 'Matthew' && styles.leaderboardRowSelf,
                    i < LEADERBOARD.length - 1 && styles.leaderboardRowBorder,
                  ]}
                >
                  <Text style={styles.rankMedal}>{RANK_MEDALS[i]}</Text>
                  <View style={[styles.leaderboardDot, { backgroundColor: entry.color }]} />
                  <Text style={[styles.leaderboardName, entry.name === 'Matthew' && { fontWeight: '900', color: '#3A2008' }]}>
                    {entry.name}{entry.name === 'Matthew' ? ' (you)' : ''}
                  </Text>
                  <View style={styles.leaderboardRight}>
                    <Text style={[styles.leaderboardXP, { color: entry.color }]}>{entry.weeklyXP} XP</Text>
                    <Text style={styles.leaderboardLv}>LV {entry.level}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Discovery heat-map blurb */}
            <Text style={styles.sectionLabel}>🔥 HOT SPOTS THIS WEEK</Text>
            <View style={styles.heatCard}>
              {[
                { name: 'Swee Choon Dim Sum', count: 12, type: 'food', bar: 0.9 },
                { name: 'Jalan Besar Stadium', count: 7, type: 'time', bar: 0.58 },
                { name: 'FC Mural — Tyrwhitt Rd', count: 5, type: 'art', bar: 0.42 },
                { name: 'Rad Son Lighting', count: 4, type: 'maker', bar: 0.33 },
                { name: 'Petain Road Shophouses', count: 3, type: 'time', bar: 0.25 },
              ].map(spot => (
                <View key={spot.name} style={styles.heatRow}>
                  <Text style={styles.heatEmoji}>
                    {spot.type === 'food' ? '🍜' : spot.type === 'time' ? '📸' : spot.type === 'art' ? '🎨' : '🔧'}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <View style={styles.heatBarRow}>
                      <Text style={styles.heatName}>{spot.name}</Text>
                      <Text style={[styles.heatCount, { color: PIN_COLORS[spot.type as Pin['type']] }]}>{spot.count} players</Text>
                    </View>
                    <View style={styles.heatBarBg}>
                      <View style={[styles.heatBarFill, {
                        width: `${spot.bar * 100}%` as any,
                        backgroundColor: PIN_COLORS[spot.type as Pin['type']],
                      }]} />
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Modals */}
      <FriendModal friend={selectedFriend} onClose={() => setSelectedFriend(null)} />
      <PinModal pin={selectedPin} onClose={() => setSelectedPin(null)} />
    </ImageBackground>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1 },
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
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },

  sectionLabel: { fontSize: 11, color: '#E8721A', fontWeight: '800', letterSpacing: 1.5, marginBottom: 10 },

  // Map
  mapCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#C9A878',
    borderBottomWidth: 5,
  },
  legend: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    flexWrap: 'wrap',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 10, color: '#6B4020', fontWeight: '600' },
  mapHint: { fontSize: 10, color: '#888', textAlign: 'center', paddingBottom: 8 },

  // Friends strip
  friendsScroll: { marginBottom: 20 },
  friendCard: {
    width: 100,
    backgroundColor: '#FFFEF8',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderBottomWidth: 5,
    gap: 3,
  },
  friendAvatarWrap: { position: 'relative' },
  statusDot: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: '#fff' },
  friendName: { fontSize: 12, fontWeight: '800' },
  friendLvBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  friendLvText: { fontSize: 10, color: '#fff', fontWeight: '800' },
  friendLastSeen: { fontSize: 9, color: '#888' },
  friendProgressRow: {},
  friendProgressText: { fontSize: 9, color: '#6B4020', fontWeight: '600' },

  // Challenge
  challengeCard: {
    backgroundColor: '#FFF9EE',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2.5,
    borderColor: '#E8721A',
    borderBottomWidth: 6,
  },
  challengeHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  challengeTitle: { fontSize: 15, fontWeight: '900', color: '#3A2008' },
  deadlinePill: { backgroundColor: '#FDDBB4', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  deadlineText: { fontSize: 9, color: '#8B4513', fontWeight: '700' },
  challengeDesc: { fontSize: 12, color: '#6B4020', lineHeight: 17, marginBottom: 12 },
  challengeMembersRow: { flexDirection: 'row', gap: 12, marginBottom: 12, flexWrap: 'wrap' },
  challengeMember: { alignItems: 'center', gap: 4 },
  challengeMemberDot: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  challengeMemberCheck: { color: '#fff', fontSize: 14, fontWeight: '900' },
  challengeMemberName: { fontSize: 9, fontWeight: '700' },
  challengeRewardRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  challengeRewardLabel: { fontSize: 9, color: '#888', fontWeight: '700', letterSpacing: 1 },
  challengeRewardText: { fontSize: 12, color: '#3A2008', fontWeight: '700', flex: 1 },
  challengeProgress: { fontSize: 11, color: '#E8721A', fontWeight: '700' },

  // Leaderboard
  leaderboardCard: {
    backgroundColor: '#FFFEF8',
    borderRadius: 18,
    padding: 14,
    marginBottom: 20,
    borderWidth: 2.5,
    borderColor: '#C9A878',
    borderBottomWidth: 6,
  },
  leaderboardPeriod: { fontSize: 10, color: '#888', marginBottom: 12, textAlign: 'center' },
  leaderboardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  leaderboardRowSelf: { backgroundColor: 'rgba(232,114,26,0.08)', borderRadius: 10, paddingHorizontal: 6, marginHorizontal: -6 },
  leaderboardRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.07)' },
  rankMedal: { fontSize: 18, width: 28, textAlign: 'center' },
  leaderboardDot: { width: 12, height: 12, borderRadius: 6 },
  leaderboardName: { flex: 1, fontSize: 14, fontWeight: '700', color: '#6B4020' },
  leaderboardRight: { alignItems: 'flex-end' },
  leaderboardXP: { fontSize: 13, fontWeight: '900' },
  leaderboardLv: { fontSize: 10, color: '#888' },

  // Heat map
  heatCard: {
    backgroundColor: '#FFFEF8',
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    borderColor: '#C9A878',
    borderBottomWidth: 5,
    gap: 14,
  },
  heatRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heatEmoji: { fontSize: 20, width: 26, textAlign: 'center' },
  heatBarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  heatName: { fontSize: 12, fontWeight: '700', color: '#3A2008', flex: 1 },
  heatCount: { fontSize: 11, fontWeight: '800' },
  heatBarBg: { height: 6, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 3, overflow: 'hidden' },
  heatBarFill: { height: '100%', borderRadius: 3 },
});

// ── Map styles ────────────────────────────────────────────────────────────────

const mapStyles = StyleSheet.create({
  container: {
    width: MAP_W,
    height: MAP_H,
    backgroundColor: '#1B3A4B',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  road: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  roadLabel: {
    position: 'absolute',
    fontSize: 7,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
  },
  landmark: {
    position: 'absolute',
    borderRadius: 4,
  },
  landmarkLabel: {
    position: 'absolute',
    fontSize: 7,
    color: 'rgba(255,255,255,0.5)',
  },
  pin: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  pinEmoji: { fontSize: 11 },
  selfMarker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D4708A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  friendMarker: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  markerLabel: {
    position: 'absolute',
    fontSize: 8,
    fontWeight: '800',
    textAlign: 'center',
    width: 36,
  },
});

// ── Modal styles ──────────────────────────────────────────────────────────────

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFEF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 14,
  },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  onlineBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  onlineText: { fontSize: 9, color: '#fff', fontWeight: '800', letterSpacing: 0.5 },
  lastSeen: { fontSize: 10, color: 'rgba(255,255,255,0.75)' },
  friendName: { fontSize: 22, fontWeight: '900', color: '#fff' },
  friendLevel: { fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },

  statsRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.07)',
  },
  statCell: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '900' },
  statLbl: { fontSize: 10, color: '#888', marginTop: 2 },

  secLabel: {
    fontSize: 10,
    color: '#888',
    fontWeight: '700',
    letterSpacing: 1.5,
    paddingHorizontal: 20,
    marginTop: 14,
    marginBottom: 4,
  },
  locationList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  locationChip: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  locationChipText: { fontSize: 11, fontWeight: '700', color: '#3A2008' },

  closeBtn: {
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  closeBtnText: { color: '#fff', fontWeight: '900', fontSize: 15 },

  // Pin modal
  pinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  pinEmojiBig: { fontSize: 34 },
  pinType: { fontSize: 9, color: 'rgba(255,255,255,0.8)', fontWeight: '700', letterSpacing: 1.5 },
  pinName: { fontSize: 17, fontWeight: '900', color: '#fff', lineHeight: 21 },
  doneBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  doneText: { fontSize: 11, color: '#fff', fontWeight: '800' },

  friendsHereSection: { paddingHorizontal: 20, marginBottom: 4 },
  friendHereRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  friendDot: { width: 10, height: 10, borderRadius: 5 },
  friendHereName: { flex: 1, fontSize: 13, fontWeight: '700', color: '#3A2008' },
  friendHereLast: { fontSize: 11, color: '#888' },

  heatRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, marginTop: 10 },
  heatLabel: { fontSize: 12, fontWeight: '700' },
  heatValue: { fontSize: 13, fontWeight: '900', color: '#3A2008' },
});

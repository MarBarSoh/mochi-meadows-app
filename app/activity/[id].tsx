import { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import MochiCharacter, { AccessoryId } from '@/components/MochiCharacter';

const ACTIVITY_DATA: Record<string, any> = {
  food: {
    id: 'food',
    name: 'Bring Back the Food',
    emoji: '🍜',
    mochi: 'bow' as AccessoryId,
    color: colors.amber,
    tag: 'FOOD TRAIL',
    tagline: 'Earn a CDC Voucher by visiting 3 heritage hawker stalls',
    heritage: 'These stalls have fed Jalan Besar for generations. Swee Choon has served dim sum since 1962.',
    reward: 'CDC Voucher',
    rewardEmoji: '🎟️',
    rewardSub: 'Complete all 3 stalls',
    accessory: 'Amber Mochi Set',
    steps: [
      { step: '1', title: 'Pick a stall', desc: 'Choose any of the 3 heritage hawker stalls on your map.' },
      { step: '2', title: 'Make a purchase', desc: 'Order and eat at the stall — support a local heritage business!' },
      { step: '3', title: 'Scan the QR code', desc: 'Find the Mochi Meadows QR at the counter and scan to log your visit.' },
      { step: '4', title: 'Collect your stamp', desc: 'Your Trail Book gets stamped. Complete all 3 for a CDC Voucher.' },
    ],
    stalls: [
      { name: 'Swee Choon Dim Sum', est: 'Est. 1962', desc: 'Legendary late-night dim sum. Famous for their char siew pau.', emoji: '🥟', done: true, address: '183-191 Jalan Besar' },
      { name: 'Sungei Road Laksa', est: 'Heritage stall', desc: "Old-school charcoal-fire laksa that's been here for decades.", emoji: '🍜', done: false, address: 'Jalan Berseh' },
      { name: 'Beach Road Curry Rice', est: 'Jalan Besar classic', desc: 'Classic mixed rice with crispy pork and braised vegetables.', emoji: '🍛', done: false, address: 'Beach Road' },
    ],
    tips: [
      '💡 Swee Choon is open late — great for a supper run',
      '💡 Sungei Road Laksa closes by early afternoon',
      '💡 Beach Road Curry Rice is a lunchtime favourite',
    ],
  },
  time: {
    id: 'time',
    name: 'Time Travelling',
    emoji: '📸',
    mochi: 'cap' as AccessoryId,
    color: colors.blue,
    tag: 'PHOTO HUNT',
    tagline: 'Match archival photos of Jalan Besar to real-life spots today',
    heritage: 'Jalan Besar has transformed dramatically — from a kampung to a vibrant urban neighbourhood. These landmarks tell that story.',
    reward: 'Kapitan Cap',
    rewardEmoji: '🧢',
    rewardSub: 'Find all 5 landmarks',
    accessory: 'Kapitan Mochi Set',
    steps: [
      { step: '1', title: 'View the archival photo', desc: 'Study the historical photo of a Jalan Besar landmark.' },
      { step: '2', title: 'Navigate to the spot', desc: 'Use the map to find where the photo was taken.' },
      { step: '3', title: 'Scan the QR on site', desc: "Scan the QR code at the location to confirm you're there." },
      { step: '4', title: 'See then vs now', desc: "Unlock a side-by-side of the archival photo and today's view." },
    ],
    stalls: [
      { name: 'Jalan Besar Stadium', est: '1930s–2014', desc: 'Once home to Singapore football — now Jalan Besar FC.', emoji: '🏟️', done: false, address: 'Tyrwhitt Road' },
      { name: 'Former SCGS Building', est: 'Colonial era', desc: 'Now Celebration Arts. Grand colonial architecture remains.', emoji: '🏫', done: false, address: 'Short Street' },
      { name: 'Rochor Centre', est: '1977–2015', desc: 'Iconic brutalist housing estate, demolished for North-South Corridor.', emoji: '🏙️', done: false, address: 'Rochor Road' },
      { name: 'Petain Road Shophouses', est: 'Early 1900s', desc: 'Peranakan-style shophouses, one of the best-preserved rows.', emoji: '🏠', done: false, address: 'Petain Road' },
      { name: 'Jalan Besar FC Mural', est: 'Community pride', desc: "Football murals celebrating the neighbourhood's sporting heritage.", emoji: '⚽', done: false, address: 'Tyrwhitt Road' },
    ],
    tips: [
      "💡 A hint system is available if you're stuck",
      '💡 Best done on foot — landmarks are within walking distance',
      '💡 Look for the blue Mochi Meadows QR signs',
    ],
  },
  art: {
    id: 'art',
    name: 'Recreate the Art',
    emoji: '🎨',
    mochi: 'beret' as AccessoryId,
    color: colors.purple,
    tag: 'AR CAMERA',
    tagline: 'Find street murals and photograph your Mochi at them',
    heritage: "Jalan Besar's mural scene celebrates the community's past — from football to heritage trades.",
    reward: 'Artist Beret',
    rewardEmoji: '🎓',
    rewardSub: 'Submit at 4 murals',
    accessory: 'Bow Mochi Art Set',
    steps: [
      { step: '1', title: 'Find a mural', desc: 'Navigate to one of the marked murals on your map.' },
      { step: '2', title: 'Open the AR camera', desc: 'Use the Mochi Meadows camera to place your Mochi in the scene.' },
      { step: '3', title: 'Take the shot', desc: 'Snap a photo of your Mochi posing with the mural.' },
      { step: '4', title: 'Submit to gallery', desc: 'Share your artwork to the community gallery for others to see.' },
    ],
    stalls: [
      { name: 'Jalan Besar FC Mural', est: 'Tyrwhitt Road', desc: 'Massive football-themed mural celebrating the local club.', emoji: '⚽', done: false, address: 'Tyrwhitt Road' },
      { name: 'Heritage Trades Mural', est: 'Short Street', desc: 'Depicts the trades that built Jalan Besar.', emoji: '🔨', done: false, address: 'Short Street' },
      { name: 'Peranakan Mural', est: 'Petain Road', desc: 'Vibrant Peranakan motifs on a restored shophouse wall.', emoji: '🌺', done: false, address: 'Petain Road' },
      { name: 'Hawker Mural', est: 'Jalan Besar', desc: 'Celebrates the food hawkers who are the heart of the neighbourhood.', emoji: '🍜', done: false, address: 'Jalan Besar' },
    ],
    tips: [
      '💡 A simple photo of the mural is the easiest submission',
      '💡 Offline mode available — submit when you have signal',
      '💡 Top submissions get featured in the gallery',
    ],
  },
  maker: {
    id: 'maker',
    name: 'Meet the Maker',
    emoji: '🔧',
    mochi: 'hardhat' as AccessoryId,
    color: colors.teal,
    tag: 'SHOP VISIT',
    tagline: 'Discover traditional trade shops and the people who run them',
    heritage: 'Rad Son Lighting and shops like it have kept traditional trades alive for decades in Jalan Besar.',
    reward: 'Hardhat & Toolbelt',
    rewardEmoji: '🪖',
    rewardSub: 'Visit 3 trade shops',
    accessory: 'Hardhat Mochi Set',
    steps: [
      { step: '1', title: 'Find a trade shop', desc: 'Navigate to one of the participating traditional shops.' },
      { step: '2', title: 'Complete the challenge', desc: "Answer a discovery question about the shop's trade and history." },
      { step: '3', title: 'Scan the shop QR', desc: 'Get the QR code from the shopkeeper after your visit.' },
      { step: '4', title: "Unlock the shop's story", desc: 'Learn the full history of the trade and earn your reward.' },
    ],
    stalls: [
      { name: 'Rad Son Lighting', est: 'Est. 2006', desc: 'Specialises in traditional and custom lighting fixtures. Ask about their vintage collection.', emoji: '💡', done: false, address: 'Jalan Besar Road' },
      { name: 'Heritage Hardware', est: 'Jalan Besar', desc: "Old-school hardware store carrying tools you can't find elsewhere.", emoji: '🔩', done: false, address: 'Jalan Besar' },
      { name: 'Rattan Workshop', est: 'Traditional craft', desc: 'One of the last rattan weavers in Singapore. Watch them work.', emoji: '🧺', done: false, address: 'Petain Road area' },
    ],
    tips: [
      '💡 Shop owners are expecting Mochi Meadows players — just say hi!',
      '💡 Meaningful reward requires actually talking to the shopkeeper',
      '💡 Best done on weekday mornings when shops are less busy',
    ],
  },
};

export default function ActivityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const act = ACTIVITY_DATA[id as string];
  const ctaScale = useRef(new Animated.Value(1)).current;
  const ctaPressIn = () =>
    Animated.spring(ctaScale, { toValue: 0.94, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  const ctaPressOut = () =>
    Animated.spring(ctaScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 14 }).start();

  if (!act) {
    return (
      <SafeAreaView style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Activity not found</Text>
      </SafeAreaView>
    );
  }

  const c = act.color;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero header */}
        <View style={[styles.heroHeader, { backgroundColor: c.bg, borderColor: c.light }]}>
          <Text style={styles.heroEmoji}>{act.emoji}</Text>
          <View style={styles.heroHeaderText}>
            <Text style={[styles.heroTag, { color: c.mid }]}>{act.tag}</Text>
            <Text style={[styles.heroTitle, { color: c.dark }]}>{act.name}</Text>
            <Text style={[styles.heroTagline, { color: c.dark }]}>{act.tagline}</Text>
          </View>
          <View style={styles.heroMochi}>
            <MochiCharacter accessory={act.mochi} size={90} />
          </View>
        </View>

        {/* Reward callout */}
        <View style={[styles.rewardCard, { backgroundColor: c.bg, borderColor: c.light }]}>
          <Text style={styles.rewardEmoji}>{act.rewardEmoji}</Text>
          <View style={styles.rewardText}>
            <Text style={styles.rewardLabel}>COMPLETE TO UNLOCK</Text>
            <Text style={[styles.rewardName, { color: c.dark }]}>{act.reward}</Text>
            <Text style={[styles.rewardSub, { color: c.mid }]}>{act.rewardSub} + {act.accessory}</Text>
          </View>
        </View>

        {/* Heritage blurb */}
        <View style={styles.heritageCard}>
          <Text style={styles.heritageLabel}>🏛️ WHY THIS MATTERS</Text>
          <Text style={styles.heritageText}>{act.heritage}</Text>
        </View>

        {/* How it works */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>HOW IT WORKS</Text>
          {act.steps.map((s: any) => (
            <View key={s.step} style={styles.stepRow}>
              <View style={[styles.stepNum, { backgroundColor: c.mid }]}>
                <Text style={styles.stepNumText}>{s.step}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepDesc}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Locations / Stalls */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            {act.id === 'food' ? 'THE 3 STALLS' : act.id === 'time' ? 'THE 5 LANDMARKS' : act.id === 'art' ? 'THE 4 MURALS' : 'THE 3 SHOPS'}
          </Text>
          {act.stalls.map((stall: any) => (
            <View
              key={stall.name}
              style={[styles.stallCard, { backgroundColor: c.bg, borderColor: stall.done ? c.mid : c.light }]}
            >
              <View style={[styles.stallIconBg, { backgroundColor: stall.done ? c.mid : c.light }]}>
                <Text style={styles.stallEmoji}>{stall.emoji}</Text>
              </View>
              <View style={styles.stallText}>
                <View style={styles.stallNameRow}>
                  <Text style={[styles.stallName, { color: c.dark }]}>{stall.name}</Text>
                  {stall.done && <Text style={styles.stallDone}>✅</Text>}
                </View>
                <Text style={[styles.stallEst, { color: c.mid }]}>{stall.est}</Text>
                <Text style={[styles.stallDesc, { color: c.dark }]}>{stall.desc}</Text>
                <Text style={[styles.stallAddress, { color: c.mid }]}>📍 {stall.address}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TIPS</Text>
          <View style={[styles.tipsCard, { backgroundColor: c.bg, borderColor: c.light }]}>
            {act.tips.map((tip: string) => (
              <Text key={tip} style={[styles.tipText, { color: c.dark }]}>{tip}</Text>
            ))}
          </View>
        </View>

        {/* CTA */}
        <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
          <TouchableOpacity
            style={[styles.cta, { backgroundColor: c.mid }]}
            activeOpacity={1}
            onPressIn={ctaPressIn}
            onPressOut={ctaPressOut}
          >
            <Text style={styles.ctaText}>📷  Scan QR to Start</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 16 },

  backBtn: { paddingHorizontal: 20, paddingVertical: 12 },
  backText: { color: colors.lpink, fontSize: 15, fontWeight: '600' },

  heroHeader: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  heroEmoji: { fontSize: 42 },
  heroHeaderText: { flex: 1 },
  heroTag: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  heroTitle: { fontSize: 22, fontWeight: '800', lineHeight: 26, marginBottom: 6 },
  heroTagline: { fontSize: 13, lineHeight: 18, opacity: 0.8 },
  heroMochi: { position: 'absolute', top: 0, right: -8, opacity: 0.22, pointerEvents: 'none' as any },

  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    gap: 14,
  },
  rewardEmoji: { fontSize: 36 },
  rewardText: { flex: 1 },
  rewardLabel: { fontSize: 9, color: colors.lgrey, fontWeight: '700', letterSpacing: 1.5 },
  rewardName: { fontSize: 18, fontWeight: '800', marginTop: 2 },
  rewardSub: { fontSize: 12, marginTop: 2 },

  heritageCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  heritageLabel: { fontSize: 10, color: colors.lpink, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  heritageText: { fontSize: 13, color: colors.text, lineHeight: 20, opacity: 0.85 },

  section: { marginBottom: 20 },
  sectionLabel: { fontSize: 11, color: colors.lpink, letterSpacing: 2, fontWeight: '700', marginBottom: 12 },

  stepRow: { flexDirection: 'row', gap: 14, marginBottom: 14, alignItems: 'flex-start' },
  stepNum: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  stepNumText: { color: colors.white, fontWeight: '800', fontSize: 13 },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 14, color: colors.text, fontWeight: '700', marginBottom: 3 },
  stepDesc: { fontSize: 12, color: colors.lgrey, lineHeight: 18 },

  stallCard: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    gap: 12,
    alignItems: 'flex-start',
  },
  stallIconBg: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stallEmoji: { fontSize: 22 },
  stallText: { flex: 1 },
  stallNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stallName: { fontSize: 14, fontWeight: '800', flex: 1 },
  stallDone: { fontSize: 14 },
  stallEst: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  stallDesc: { fontSize: 12, lineHeight: 17, marginTop: 4, opacity: 0.8 },
  stallAddress: { fontSize: 11, marginTop: 4, fontWeight: '600' },

  tipsCard: { borderRadius: 14, padding: 14, borderWidth: 1, gap: 10 },
  tipText: { fontSize: 13, lineHeight: 18, opacity: 0.85 },

  cta: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  ctaText: { color: colors.white, fontWeight: '800', fontSize: 16 },
});

import { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import MochiCharacter, { AccessoryId } from '@/components/MochiCharacter';

const meadow = require('../../assets/images/meadow.png');

const ACTIVITY_DATA: Record<string, any> = {
  food: {
    id: 'food',
    name: 'Bring Back the Food',
    emoji: '🍜',
    mochi: 'bow' as AccessoryId,
    color: colors.amber,
    tag: 'FOOD TRAIL',
    tagline: 'Visit 3 heritage stalls with 4+ friends — scan QR after each purchase',
    heritage: 'These stalls have fed Jalan Besar for generations. Swee Choon has served dim sum since 1962, surviving waves of urban renewal and changing tastes. This is a group activity — exploring together makes the heritage stories richer and the meals even better.',
    reward: 'Food Accessories',
    rewardEmoji: '🍞',
    rewardSub: 'Complete all 3 stalls (group of 4+)',
    accessory: 'Kaya Toast Hat + Ice Kachang Headband',
    groupNote: '👥 Minimum group of 4 required',
    steps: [
      { step: '1', title: 'Form your group', desc: 'Gather at least 4 friends. This is a group activity — explore Jalan Besar together!' },
      { step: '2', title: 'Visit a stall & order', desc: 'Head to a heritage hawker stall and make a purchase. You are supporting a real local heritage business.' },
      { step: '3', title: 'Scan the QR at the counter', desc: 'After paying, find the Mochi Meadows QR code at the counter and scan it to log your group visit.' },
      { step: '4', title: 'Read the stall story', desc: 'Unlock a short heritage story about the stall and its signature dish. Your group earns XP together.' },
    ],
    stalls: [
      { name: 'Swee Choon Dim Sum', est: 'Est. 1962', desc: 'Legendary late-night dim sum. Famous for their char siew pau and open-kitchen style.', emoji: '🥟', done: true, address: '183–191 Jalan Besar' },
      { name: 'Sungei Road Laksa', est: 'Heritage stall', desc: "Old-school charcoal-fire laksa that has been here for decades. A dying art form.", emoji: '🍜', done: false, address: 'Jalan Berseh' },
      { name: 'Beach Road Curry Rice', est: 'Jalan Besar classic', desc: 'Classic mixed rice with crispy pork and braised vegetables. A true neighbourhood institution.', emoji: '🍛', done: false, address: 'Beach Road' },
    ],
    tips: [
      '👥 Bring at least 4 friends — minimum group required to participate',
      '💡 Swee Choon is open late — great for a supper run with your crew',
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
    tagline: 'Match archival photos to real Jalan Besar spots — unlock a CDC Voucher',
    heritage: 'Jalan Besar has transformed dramatically — from a kampung to a vibrant urban neighbourhood. Rochor Centre once housed thousands; the former SCGS building now hosts arts spaces. These landmarks carry the memory of everything that was here before.',
    reward: 'Kapitan Cap + CDC Voucher',
    rewardEmoji: '🎟️',
    rewardSub: 'Complete any 3 landmarks',
    accessory: 'Colonial-Era Outfit',
    steps: [
      { step: '1', title: 'Study the archival photo', desc: 'The app shows you a historical photograph of a Jalan Besar landmark as it looked decades ago.' },
      { step: '2', title: 'Navigate to the real spot', desc: 'Use the in-app map and photo clues to locate the exact spot in real life today.' },
      { step: '3', title: 'Scan the on-site QR', desc: 'At the location, scan the QR code on the heritage plaque or signboard to confirm your arrival.' },
      { step: '4', title: 'See then vs now', desc: 'Unlock a side-by-side comparison of the archival photo and the spot as it looks today. History revealed.' },
    ],
    stalls: [
      { name: 'Jalan Besar Stadium', est: '1930s – 2014', desc: 'Once home to Singapore football. Demolished and rebuilt as Jalan Besar Stadium — the FC lives on.', emoji: '🏟️', done: false, address: 'Tyrwhitt Road' },
      { name: 'Former SCGS Building', est: 'Colonial era', desc: 'Now Celebration Arts. The grand colonial architecture remains untouched — a ghost of the school that was.', emoji: '🏫', done: false, address: 'Short Street' },
      { name: 'Rochor Centre', est: '1977 – 2015', desc: 'Iconic brutalist housing estate in vivid colours. Demolished for the North–South Corridor — only photos remain.', emoji: '🏙️', done: false, address: 'Rochor Road' },
      { name: 'Petain Road Shophouses', est: 'Early 1900s', desc: 'Peranakan-style shophouses, one of the best-preserved rows in Singapore. A time capsule of early Jalan Besar.', emoji: '🏠', done: false, address: 'Petain Road' },
      { name: 'Jalan Besar FC Mural', est: 'Community pride', desc: "Football murals celebrating the neighbourhood's sporting heritage and the club that carries its name.", emoji: '⚽', done: false, address: 'Tyrwhitt Road' },
    ],
    tips: [
      '🎟️ Complete any 3 landmarks to unlock a CDC Voucher',
      '💡 A hint system is available if you get stuck on a location',
      '💡 Best done on foot — all landmarks are within walking distance',
      '💡 Look for the blue Mochi Meadows QR plaques on-site',
    ],
  },
  art: {
    id: 'art',
    name: 'Recreate the Art',
    emoji: '🎨',
    mochi: 'beret' as AccessoryId,
    color: colors.purple,
    tag: 'AR CAMERA + GALLERY',
    tagline: 'Snap your Mochi at murals in AR, then submit your own artwork to the community gallery',
    heritage: "Jalan Besar's murals celebrate the area's multicultural past — football, heritage trades, Peranakan culture, hawker life. The Community Gallery turns every player into part of the living artwork.",
    reward: 'Artist Beret + Paint Palette',
    rewardEmoji: '🎨',
    rewardSub: 'Snap at murals + submit artwork',
    accessory: 'Artist Mochi Set',
    steps: [
      { step: '1', title: 'Find a mural on the map', desc: 'Navigate to one of the marked mural locations across Jalan Besar using the in-app mural map.' },
      { step: '2', title: 'Snapshot Challenge (AR)', desc: 'Open the AR camera, place your Mochi in front of the mural, and take the shot. Earn XP for each snap.' },
      { step: '3', title: 'Create your own rendition', desc: 'Draw or create your own version of the mural and submit it through the app. One entry per mural per player.' },
      { step: '4', title: 'Community gallery votes', desc: 'Your artwork enters the Community Gallery ranked by votes. Earn XP for every 50 votes you receive — capped at 300 votes.' },
    ],
    stalls: [
      { name: 'Jalan Besar FC Mural', est: 'Tyrwhitt Road', desc: 'Massive football-themed mural celebrating the local club and neighbourhood sporting pride.', emoji: '⚽', done: false, address: 'Tyrwhitt Road' },
      { name: 'Heritage Trades Mural', est: 'Short Street', desc: 'Depicts the traditional craftsmen and trades that built Jalan Besar over generations.', emoji: '🔨', done: false, address: 'Short Street' },
      { name: 'Peranakan Mural', est: 'Petain Road', desc: 'Vibrant Peranakan motifs on a restored shophouse wall — a riot of colour and history.', emoji: '🌺', done: false, address: 'Petain Road' },
      { name: 'Hawker Heritage Mural', est: 'Jalan Besar', desc: 'Celebrates the food hawkers who are the beating heart of the neighbourhood.', emoji: '🍜', done: false, address: 'Jalan Besar' },
    ],
    tips: [
      '🗳️ Get 50 community votes to earn bonus XP — up to 300 votes per artwork',
      '📸 Only 1 submission per mural — choose your best shot',
      '🏆 Top-voted artworks are featured at the top of the Community Gallery',
      '💡 Offline mode available — submit your artwork when you have signal',
    ],
    galleryNote: true,
  },
  maker: {
    id: 'maker',
    name: 'Meet the Maker',
    emoji: '🔧',
    mochi: 'hardhat' as AccessoryId,
    color: colors.teal,
    tag: 'QUIZ + SHOP VISIT',
    tagline: 'Visit trade shops and race friends in a Kahoot-style heritage quiz',
    heritage: 'Rad Son Lighting and shops like it have kept traditional trades alive in Jalan Besar for decades — invisible to most young visitors. The quiz is your excuse to walk in and discover what keeps these businesses going.',
    reward: 'Rattan Bag + Toolbelt + Batik Headscarf',
    rewardEmoji: '🪖',
    rewardSub: 'Complete quiz at each shop (one-time XP)',
    accessory: 'Hardware Cap',
    steps: [
      { step: '1', title: 'Find a Maker Stop', desc: 'Navigate to a participating traditional trade shop listed as a Maker Stop on the map.' },
      { step: '2', title: 'Scan the shop QR', desc: 'Ask the shopkeeper for the Mochi Meadows QR code and scan it to start the quiz.' },
      { step: '3', title: 'Race your friends (Kahoot-style)', desc: 'Answer questions about the shop\'s heritage and trade. Faster correct answers score more points. Final group rankings determine bonus XP.' },
      { step: '4', title: 'Earn XP & unlock the story', desc: 'All players earn XP based on their quiz result. Unlock the full heritage story of the business. One-time XP only — make it count!' },
    ],
    stalls: [
      { name: 'Rad Son Lighting', est: 'Est. 2006', desc: 'Specialises in traditional and custom lighting fixtures. Ask about their vintage collection — each piece has a story.', emoji: '💡', done: false, address: 'Jalan Besar Road' },
      { name: 'Heritage Hardware', est: 'Jalan Besar', desc: 'Old-school hardware store carrying tools you cannot find anywhere else. Still run the old-fashioned way.', emoji: '🔩', done: false, address: 'Jalan Besar' },
      { name: 'Rattan Workshop', est: 'Traditional craft', desc: 'One of the last rattan weavers in Singapore. Watch them work — it is a disappearing art.', emoji: '🧺', done: false, address: 'Petain Road area' },
    ],
    tips: [
      '🎮 Play solo or race friends — faster correct answers score higher',
      '💡 You can only earn XP once per shop — make your visit count!',
      '💡 Shop owners are expecting Mochi Meadows players — just walk in and say hi',
      '💡 Best visited on weekday mornings when shops are less busy',
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
    <ImageBackground source={meadow} style={{ flex: 1 }} resizeMode="cover">
    <SafeAreaView style={styles.safe} edges={['top']}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.actCardPanel}>
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

        {/* Group note for food trail */}
        {act.groupNote && (
          <View style={[styles.groupNoteCard, { backgroundColor: c.bg, borderColor: c.mid }]}>
            <Text style={[styles.groupNoteText, { color: c.dark }]}>{act.groupNote}</Text>
            <Text style={[styles.groupNoteSub, { color: c.mid }]}>Gather your crew before heading out</Text>
          </View>
        )}

        {/* Reward callout */}
        <View style={[styles.rewardCard, { backgroundColor: c.bg, borderColor: c.light }]}>
          <Text style={styles.rewardEmoji}>{act.rewardEmoji}</Text>
          <View style={styles.rewardText}>
            <Text style={styles.rewardLabel}>COMPLETE TO UNLOCK</Text>
            <Text style={[styles.rewardName, { color: c.dark }]}>{act.reward}</Text>
            <Text style={[styles.rewardSub, { color: c.mid }]}>{act.rewardSub} · {act.accessory}</Text>
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

        {/* Locations / Stalls / Murals / Shops */}
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

        {/* Community Gallery teaser for Art activity */}
        {act.galleryNote && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>🖼️ COMMUNITY GALLERY</Text>
            <View style={[styles.galleryCard, { backgroundColor: c.bg, borderColor: c.light }]}>
              <Text style={[styles.galleryTitle, { color: c.dark }]}>Your artwork goes live for all players to see</Text>
              <Text style={[styles.galleryDesc, { color: c.mid }]}>
                All Recreate the Art submissions are displayed in the Community Gallery, sorted by votes. Top-rated artworks are featured first and earn bonus XP rewards.
              </Text>
              <View style={styles.galleryXpRow}>
                {[
                  { votes: '50 votes', xp: '+XP' },
                  { votes: '100 votes', xp: '+XP' },
                  { votes: '300 votes', xp: 'MAX XP (cap)' },
                ].map(row => (
                  <View key={row.votes} style={[styles.galleryXpChip, { backgroundColor: c.light }]}>
                    <Text style={[styles.galleryXpVotes, { color: c.dark }]}>{row.votes}</Text>
                    <Text style={[styles.galleryXpReward, { color: c.mid }]}>{row.xp}</Text>
                  </View>
                ))}
              </View>
              <View style={[styles.comingSoonBanner, { backgroundColor: c.light }]}>
                <Text style={[styles.comingSoonBannerText, { color: c.dark }]}>🚧  Community Gallery coming soon</Text>
              </View>
            </View>
          </View>
        )}

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
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 16 },
  actCardPanel: {
    flex: 1,
    backgroundColor: 'rgba(253,246,236,0.97)',
    overflow: 'hidden',
  },

  backBtn: {
    paddingHorizontal: 20, paddingVertical: 12,
    flexDirection: 'row', alignItems: 'center',
  },
  backText: {
    color: '#FFFEF8', fontSize: 16, fontWeight: '800',
    textShadowColor: '#4A2000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2,
  },

  heroHeader: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
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

  groupNoteCard: {
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderStyle: 'dashed' as any,
  },
  groupNoteText: { fontSize: 14, fontWeight: '800' },
  groupNoteSub: { fontSize: 11, marginTop: 2 },

  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    gap: 14,
  },
  rewardEmoji: { fontSize: 36 },
  rewardText: { flex: 1 },
  rewardLabel: { fontSize: 9, color: colors.lgrey, fontWeight: '700', letterSpacing: 1.5 },
  rewardName: { fontSize: 18, fontWeight: '800', marginTop: 2 },
  rewardSub: { fontSize: 11, marginTop: 2, lineHeight: 16 },

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

  // Community Gallery (Art activity)
  galleryCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    gap: 10,
  },
  galleryTitle: { fontSize: 14, fontWeight: '800', lineHeight: 19 },
  galleryDesc: { fontSize: 12, lineHeight: 18, opacity: 0.85 },
  galleryXpRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  galleryXpChip: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  galleryXpVotes: { fontSize: 11, fontWeight: '800' },
  galleryXpReward: { fontSize: 10, fontWeight: '700', marginTop: 1 },
  comingSoonBanner: {
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  comingSoonBannerText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.3 },

  tipsCard: { borderRadius: 14, padding: 14, borderWidth: 1, gap: 10 },
  tipText: { fontSize: 13, lineHeight: 18, opacity: 0.85 },

  cta: {
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#6B4020',
    borderBottomWidth: 7,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 4,
  },
  ctaText: { color: '#FFFEF8', fontWeight: '900', fontSize: 17, letterSpacing: 0.3 },
});

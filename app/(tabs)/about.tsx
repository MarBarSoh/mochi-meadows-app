import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const OVERVIEW = `Jalan Besar — meaning "Big Road" in Malay — is a historic district in central Singapore, bounded by Rochor Road, Serangoon Road, and Lavender Street. Established under British colonial rule in the early 19th century, it grew into a bustling hub of shophouses, markets, and working-class community life.\n\nThe area has been home to South Indian Muslim traders, Hakka Chinese craftspeople, and generations of hawkers who shaped its distinctive identity. Today it sits at the crossroads of heritage and modernity — old shophouses stand beside trendy cafes, and traditional trades continue alongside new businesses.`;

const TIMELINE = [
  { year: '1820s', event: 'Area mapped under Raffles\' original town plan; Jalan Besar established as a main road northward.' },
  { year: '1900s', event: 'Rows of two-storey shophouses built. South Indian Muslim and Hakka Chinese tradespeople settle in the area.' },
  { year: '1930s', event: 'Jalan Besar Stadium opens. The Sungei Road flea market — the "Thieves\' Market" — begins trading along the Rochor River.' },
  { year: '1960s–70s', event: 'Rapid post-independence urbanisation reshapes the neighbourhood. HDB public housing starts replacing older kampungs nearby.' },
  { year: '1977', event: 'Rochor Centre completed — four iconic colourful towers that became one of Singapore\'s most beloved landmarks.' },
  { year: '1990s', event: 'Urban Redevelopment Authority gazetted several Jalan Besar shophouse rows as conservation areas, protecting their pre-war facades.' },
  { year: '2014', event: 'Old Jalan Besar Stadium demolished; a new 6,000-seat stadium opens on the same site.' },
  { year: '2016–17', event: 'Rochor Centre demolished for the North-South Corridor. Sungei Road Market closes after 80+ years of operation.' },
  { year: '2020', event: 'Singapore hawker culture — deeply tied to areas like Jalan Besar — inscribed on UNESCO\'s Intangible Cultural Heritage list.' },
  { year: 'Today', event: 'Jalan Besar thrives as a heritage district with independent cafes, conserved shophouses, and traditional trades side by side.' },
];

const AREAS = [
  {
    key: 'stadium',
    name: 'Jalan Besar Stadium',
    emoji: '🏟️',
    period: '1930 – present',
    teaser: 'A sporting landmark that has defined the area for nearly a century.',
    body: `The original Jalan Besar Stadium was built in 1930 and became the home ground of the Singapore national football team for decades, hosting some of the country's most historic matches. It was a place of genuine community pride, packed with local supporters who followed club and national football through Singapore's early years of independence.\n\nThe old stadium was demolished in 2014 after falling into disrepair and was replaced by a modern 6,000-seat facility that opened the same year. The new stadium continues to host domestic league football and is used by Tanjong Pagar United FC. It remains a symbol of Jalan Besar's proud sporting heritage — a neighbourhood that has always been deeply connected to the beautiful game.`,
  },
  {
    key: 'rochor',
    name: 'Rochor Centre',
    emoji: '🏙️',
    period: '1977 – 2016',
    teaser: 'Singapore\'s beloved "Lego block" estate — colourful, communal, and controversially lost.',
    body: `Rochor Centre was completed in 1977 as one of Singapore's earliest HDB (Housing Development Board) developments. Its four interconnected towers — painted in bright yellow, blue, green, and orange — made it one of the most instantly recognisable buildings in the city-state.\n\nBeyond its eye-catching appearance, Rochor Centre was a lively community hub. Its ground floor was packed with wet markets, hawker stalls, and small provision shops. Residents who grew up there remember it as warm, noisy, and full of life — the kind of lived-in community that defined old Singapore.\n\nIn 2011, the government announced Rochor Centre would be demolished to make way for the North-South Corridor expressway. Residents were resettled, the shops closed, and demolition was completed by 2016. The loss was widely mourned. Street photographers and heritage advocates documented the estate extensively before it came down, and it is still frequently cited as one of Singapore's most lamented demolitions.`,
  },
  {
    key: 'petain',
    name: 'Petain Road Shophouses',
    emoji: '🏠',
    period: 'c. 1920s – present',
    teaser: 'One of Singapore\'s finest rows of Peranakan-style conserved shophouses.',
    body: `Petain Road is lined with two-storey shophouses built in the 1920s and 1930s. The road is named after French Marshal Philippe Pétain — a celebrated hero of World War I, though later controversial for his role as head of the Vichy French government during World War II.\n\nThe shophouses feature ornate facades with colourful ceramic tiles, decorative plasterwork, carved timber screens, and eclectic motifs that blend Chinese, Malay, and European influences. This architectural style is sometimes called "Straits Eclectic" or colloquially "Peranakan shophouse style" — a distinctly Singaporean hybrid born of the multicultural Straits Settlements era.\n\nThe Urban Redevelopment Authority gazetted Petain Road as a conservation area, protecting its built heritage from demolition. Walking down Petain Road today, with its restored facades and potted plants on five-foot ways, offers one of the most atmospheric glimpses of pre-war Singapore still accessible to the public.`,
  },
  {
    key: 'sungei',
    name: 'Sungei Road Flea Market',
    emoji: '🛒',
    period: '1930s – 2017',
    teaser: 'Singapore\'s oldest flea market — the legendary "Thieves\' Market" — that traded for over 80 years.',
    body: `The Sungei Road Flea Market operated for over 80 years along the banks of the Rochor River. Vendors — many of them elderly men with their goods laid out on plastic sheets — sold an extraordinary mix of second-hand goods: vintage electronics, old tools, antique clocks, military surplus, used books, crockery, and outright curios.\n\nThe nickname "Thieves' Market" was more folk legend than reality. The market was a genuine institution beloved by bargain hunters, collectors, nostalgic older Singaporeans, and curious tourists. For many, a Sunday morning browse was a cherished ritual.\n\nIn July 2017, the Land Transport Authority closed the market to clear land for the Jalan Besar MRT station exit and other development. The closure attracted significant media attention and public lamentation — the market's last days were documented extensively, and many felt Singapore had lost something irreplaceable. A commemorative plaque now marks the site near Sungei Road.`,
  },
  {
    key: 'shortstreet',
    name: 'Short Street & Former SCGS',
    emoji: '🏫',
    period: 'c. 1910s – present',
    teaser: 'Home to colonial-era educational heritage and one of Singapore\'s oldest girls\' schools.',
    body: `Short Street was once home to the Singapore Chinese Girls' School (SCGS), one of Singapore's oldest schools for girls. SCGS was founded in 1899 and was based in Jalan Besar for much of its early history. The school was instrumental in promoting education for Chinese girls at a time when this was not yet common practice.\n\nSCGS relocated to Clementi Road in 1990. Its original building on Short Street — a graceful colonial-era structure with wide verandas, red-tiled rooflines, and arched openings — has since been repurposed and restored. The architecture reflects the civic confidence of Singapore's early 20th-century institutions, designed to last and to impress.\n\nToday, the area around Short Street is part of a broader enclave of conserved heritage buildings that includes arts and creative spaces, reflecting how Singapore reuses its colonial built environment for contemporary community purposes.`,
  },
  {
    key: 'berseh',
    name: 'Berseh Food Centre',
    emoji: '🍜',
    period: '1981 – present',
    teaser: 'A hawker centre that houses some of Singapore\'s most legendary dishes, including the last charcoal-fire laksa.',
    body: `Berseh Food Centre (also known as Jalan Besar Food Centre) opened in the early 1980s as part of Singapore's national hawker centre resettlement programme, which moved street food vendors from the roadside into organised, covered centres. It quickly became a neighbourhood institution.\n\nIts most famous tenant is the Sungei Road Laksa stall — one of the last in Singapore to use traditional charcoal fire to cook its broth. The stall has been run by the same family for generations. The laksa is characterised by its rich, smoky coconut milk broth and thin rice vermicelli, quite different from the richer Katong-style laksa found elsewhere. Queues form early; the stall often sells out by midday.\n\nHawker culture in Singapore — of which Berseh is a living example — was inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity in 2020, recognising it as an irreplaceable part of Singapore's social fabric and national identity.`,
  },
  {
    key: 'conservation',
    name: 'Jalan Besar Conservation Area',
    emoji: '🏛️',
    period: 'c. 1900s – present',
    teaser: 'A precinct of pre-war shophouses that preserves the story of Singapore\'s tradespeople and craftsmen.',
    body: `The Jalan Besar Conservation Area encompasses rows of pre-war shophouses gazetted by the Urban Redevelopment Authority (URA) for conservation. Built primarily in the early 20th century, these shophouses originally housed Chinese clan associations, small manufacturers, hardware suppliers, and general provision shops.\n\nThe district has undergone significant gentrification since the 2000s. Many shophouses now house boutique hotels, independent cafes, creative studios, and concept stores. Yet traditional businesses continue to survive alongside the new — hardware stores, lighting shops (such as Rad Son Lighting on Jalan Besar Road, established 2006), and rattan craftsmen can still be found if you know where to look.\n\nThe preservation of Jalan Besar's shophouses is part of Singapore's broader effort to maintain the physical fabric of its heritage districts. The URA's conservation framework has protected hundreds of shophouses across Singapore since the 1980s, allowing them to be adapted for contemporary uses while their historic facades and structural form are retained — a balance the city continues to negotiate.`,
  },
];

function AccordionItem({ area, isOpen, onToggle }: {
  area: typeof AREAS[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={[styles.accordionItem, isOpen && styles.accordionItemOpen]}>
      <TouchableOpacity style={styles.accordionHeader} onPress={onToggle} activeOpacity={0.75}>
        <View style={styles.accordionHeaderLeft}>
          <Text style={styles.accordionEmoji}>{area.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.accordionName}>{area.name}</Text>
            <Text style={styles.accordionPeriod}>{area.period}</Text>
          </View>
        </View>
        <Text style={[styles.accordionChevron, isOpen && styles.accordionChevronOpen]}>›</Text>
      </TouchableOpacity>

      {!isOpen && (
        <Text style={styles.accordionTeaser}>{area.teaser}</Text>
      )}

      {isOpen && (
        <View style={styles.accordionBody}>
          <Text style={styles.accordionBodyText}>{area.body}</Text>
        </View>
      )}
    </View>
  );
}

export default function AboutScreen() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenKey(prev => (prev === key ? null : key));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSub}>HERITAGE & HISTORY</Text>
          <Text style={styles.headerTitle}>About Jalan Besar</Text>
        </View>

        {/* Overview card */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>📍 OVERVIEW</Text>
          <Text style={styles.overviewText}>{OVERVIEW}</Text>
        </View>

        {/* Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🕰️ BRIEF HISTORY</Text>
          <View style={styles.timelineCard}>
            {TIMELINE.map((item, i) => (
              <View key={item.year} style={styles.timelineRow}>
                <View style={styles.timelineLeft}>
                  <Text style={styles.timelineYear}>{item.year}</Text>
                  {i < TIMELINE.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <Text style={styles.timelineEvent}>{item.event}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Areas accordion */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🏘️ WELL-KNOWN AREAS</Text>
          <Text style={styles.sectionHint}>Tap any area to read its history</Text>
          <View style={styles.accordionList}>
            {AREAS.map((area) => (
              <AccordionItem
                key={area.key}
                area={area}
                isOpen={openKey === area.key}
                onToggle={() => toggle(area.key)}
              />
            ))}
          </View>
        </View>

        {/* Fun fact */}
        <View style={styles.funFactCard}>
          <Text style={styles.funFactLabel}>💡 DID YOU KNOW?</Text>
          <Text style={styles.funFactText}>
            "Jalan Besar" literally means "Big Road" in Malay — a fitting name for one of Singapore's oldest and most historically layered districts. At its peak in the 1960s, the area was home to over 200 small businesses operating from the ground floors of shophouses, from tinsmiths and rattan weavers to provision shops and fortune tellers.
          </Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 16 },

  header: { marginBottom: 18, paddingTop: 8 },
  headerSub: { fontSize: 10, color: colors.lpink, letterSpacing: 2, fontWeight: '700' },
  headerTitle: { fontSize: 26, color: colors.text, fontWeight: '800', letterSpacing: -0.5 },

  // Overview
  overviewCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#6B4020',
    borderBottomWidth: 6,
  },
  overviewLabel: { fontSize: 10, color: colors.lpink, letterSpacing: 2, fontWeight: '700', marginBottom: 10 },
  overviewText: { fontSize: 13, color: colors.text, lineHeight: 21, opacity: 0.9 },

  // Section
  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 11, color: colors.lpink, letterSpacing: 2, fontWeight: '700', marginBottom: 6 },
  sectionHint: { fontSize: 11, color: colors.lgrey, fontStyle: 'italic', marginBottom: 14 },

  // Timeline
  timelineCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 3,
    borderColor: '#6B4020',
    borderBottomWidth: 6,
    marginTop: 10,
  },
  timelineRow: { flexDirection: 'row', gap: 14, marginBottom: 0 },
  timelineLeft: { width: 56, alignItems: 'center' },
  timelineYear: {
    fontSize: 10,
    color: colors.pink,
    fontWeight: '800',
    textAlign: 'center',
    paddingTop: 2,
    lineHeight: 14,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.12)',
    marginTop: 4,
    marginBottom: 4,
    minHeight: 16,
    alignSelf: 'center',
  },
  timelineEvent: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
    lineHeight: 18,
    opacity: 0.85,
    paddingVertical: 2,
    paddingBottom: 14,
  },

  // Accordion
  accordionList: { gap: 10 },
  accordionItem: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#C9A878',
    borderBottomWidth: 5,
    overflow: 'hidden',
  },
  accordionItemOpen: {
    borderColor: '#6B4020',
    borderBottomWidth: 6,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    gap: 10,
  },
  accordionHeaderLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, flex: 1 },
  accordionEmoji: { fontSize: 26, marginTop: 1 },
  accordionName: { fontSize: 14, color: colors.text, fontWeight: '800', lineHeight: 19 },
  accordionPeriod: { fontSize: 10, color: colors.lgrey, fontWeight: '600', marginTop: 2 },
  accordionChevron: {
    fontSize: 24,
    color: colors.lpink,
    fontWeight: '700',
    transform: [{ rotate: '0deg' }],
  },
  accordionChevronOpen: {
    transform: [{ rotate: '90deg' }],
    color: colors.pink,
  },
  accordionTeaser: {
    fontSize: 12,
    color: colors.lgrey,
    paddingHorizontal: 16,
    paddingBottom: 14,
    lineHeight: 17,
    fontStyle: 'italic',
  },
  accordionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    paddingTop: 12,
  },
  accordionBodyText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 21,
    opacity: 0.88,
  },

  // Fun fact
  funFactCard: {
    backgroundColor: colors.amber.bg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 3,
    borderColor: colors.amber.light,
    borderBottomWidth: 6,
  },
  funFactLabel: { fontSize: 10, color: colors.amber.dark, letterSpacing: 1.5, fontWeight: '700', marginBottom: 10 },
  funFactText: { fontSize: 13, color: colors.amber.dark, lineHeight: 20, opacity: 0.9 },
});

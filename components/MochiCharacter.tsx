import Svg, {
  Circle,
  Ellipse,
  Path,
  G,
  Rect,
  Line,
} from 'react-native-svg';

export type AccessoryId =
  | 'none'
  // hats
  | 'bow'
  | 'cap'
  | 'beret'
  | 'hardhat'
  | 'toast'
  // accessories
  | 'hairpin'
  | 'jade'
  | 'bracelet'
  | 'kerosang'
  | 'toolbelt'
  | 'bag'
  | 'gold_bangle'
  | 'lantern'
  // clothing
  | 'batik_shirt'
  | 'kebaya'
  | 'sarong'
  | 'changshan'
  // shoes
  | 'sneakers'
  | 'sandals'
  | 'slippers'
  | 'wedge_heels';

// ── Hat accessories ───────────────────────────────────────────────────────────

function BowAccessory() {
  return (
    <G>
      <Path d="M 58 14 Q 50 8 46 18 Q 52 20 58 14 Z" fill="#E8608A" />
      <Path d="M 58 14 Q 66 8 70 18 Q 64 20 58 14 Z" fill="#E8608A" />
      <Circle cx="58" cy="16" r="4" fill="#D4708A" />
      <Path d="M 55 18 Q 50 26 48 24" stroke="#E8608A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M 61 18 Q 66 26 68 24" stroke="#E8608A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </G>
  );
}

function CapAccessory() {
  return (
    <G>
      <Path d="M 20 30 Q 22 10 50 8 Q 78 10 80 30 Z" fill="#8B6340" />
      <Ellipse cx="50" cy="30" rx="32" ry="8" fill="#6B4C2A" />
      <Circle cx="50" cy="10" r="4" fill="#6B4C2A" />
    </G>
  );
}

function BeretAccessory() {
  return (
    <G>
      <Path d="M 24 30 Q 26 8 50 6 Q 74 8 76 30 Z" fill="#534AB7" />
      <Ellipse cx="50" cy="30" rx="30" ry="7" fill="#3B348A" />
      <Circle cx="50" cy="8" r="4" fill="#3B348A" />
    </G>
  );
}

function HardhatAccessory() {
  return (
    <G>
      <Path d="M 20 32 Q 22 8 50 6 Q 78 8 80 32 Z" fill="#F5C518" />
      <Rect x="16" y="28" width="68" height="8" rx="4" fill="#D4A800" />
      <Rect x="44" y="6" width="12" height="26" rx="3" fill="#D4A800" opacity="0.4" />
    </G>
  );
}

function ToastAccessory() {
  return (
    <G>
      <Rect x="28" y="10" width="44" height="28" rx="6" fill="#C8965A" />
      <Rect x="28" y="10" width="44" height="6" rx="6" fill="#A0723A" />
      <Rect x="28" y="32" width="44" height="6" rx="4" fill="#A0723A" />
      <Rect x="30" y="18" width="40" height="12" rx="3" fill="#7CB87A" opacity="0.8" />
      <Ellipse cx="50" cy="38" rx="28" ry="5" fill="#8B5E2A" />
    </G>
  );
}

// ── Accessory slot items ──────────────────────────────────────────────────────

function HairpinAccessory() {
  // Traditional flower hairpin at top-right of head
  return (
    <G>
      <Line x1="56" y1="26" x2="73" y2="15" stroke="#C9A800" strokeWidth="2.5" strokeLinecap="round" />
      <Circle cx="53" cy="29" r="4" fill="#FF8CB0" opacity="0.95" />
      <Circle cx="50" cy="24" r="4" fill="#E8608A" opacity="0.95" />
      <Circle cx="55" cy="21" r="4" fill="#FF8CB0" opacity="0.95" />
      <Circle cx="60" cy="24" r="4" fill="#E8608A" opacity="0.95" />
      <Circle cx="59" cy="29" r="4" fill="#FF8CB0" opacity="0.95" />
      <Circle cx="55" cy="25" r="3" fill="#FFD700" />
      <Circle cx="74" cy="15" r="3.5" fill="#C9A800" />
      <Circle cx="74" cy="15" r="1.8" fill="#FFE566" />
    </G>
  );
}

function JadeAccessory() {
  return (
    <G>
      <Path d="M 28 84 Q 50 93 72 84" stroke="#1A6B3E" strokeWidth="1.2" fill="none" />
      <Circle cx="28" cy="84" r="3.5" fill="#3DB870" />
      <Circle cx="36" cy="87.5" r="3.5" fill="#2EAD60" />
      <Circle cx="44" cy="90" r="3.5" fill="#3DB870" />
      <Circle cx="50" cy="91.5" r="4.5" fill="#2EAD60" />
      <Circle cx="56" cy="90" r="3.5" fill="#3DB870" />
      <Circle cx="64" cy="87.5" r="3.5" fill="#2EAD60" />
      <Circle cx="72" cy="84" r="3.5" fill="#3DB870" />
      <Circle cx="50" cy="91.5" r="5.5" fill="none" stroke="#C9A800" strokeWidth="1.5" />
      <Circle cx="50" cy="91.5" r="2" fill="#F7E690" />
    </G>
  );
}

function BraceletAccessory() {
  // Jade bracelet on right ear/wrist area
  return (
    <G>
      <Ellipse cx="84" cy="40" rx="10" ry="5.5" fill="none" stroke="#3DB870" strokeWidth="5" />
      <Ellipse cx="84" cy="40" rx="10" ry="5.5" fill="none" stroke="#2EAD60" strokeWidth="3" />
      <Path d="M 76 36 Q 80 33 84 36" stroke="#88EEB0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85" />
      <Circle cx="84" cy="35" r="2.2" fill="#C9A800" />
      <Circle cx="84" cy="45" r="2.2" fill="#C9A800" />
    </G>
  );
}

function KerosangAccessory() {
  return (
    <G>
      <Path d="M 50 77 L 55 83 L 50 89 L 45 83 Z" fill="#C9A800" />
      <Path d="M 50 77 L 55 83 L 50 89 L 45 83 Z" fill="none" stroke="#8B7000" strokeWidth="0.8" />
      <Circle cx="50" cy="83" r="2.2" fill="#F0E0B0" />
      <Circle cx="48.5" cy="81.5" r="0.9" fill="white" opacity="0.85" />
      <Rect x="49" y="89" width="2" height="3" fill="#B8940A" />
      <Path d="M 50 92 L 55 97.5 L 50 100 L 45 97.5 Z" fill="#C9A800" />
      <Path d="M 50 92 L 55 97.5 L 50 100 L 45 97.5 Z" fill="none" stroke="#8B7000" strokeWidth="0.8" />
      <Circle cx="50" cy="97" r="2" fill="#F0E0B0" />
      <Circle cx="48.5" cy="95.5" r="0.8" fill="white" opacity="0.85" />
    </G>
  );
}

function ToolbeltAccessory() {
  return (
    <G>
      <Rect x="20" y="82" width="60" height="8" rx="4" fill="#5C3D1E" />
      <Rect x="44" y="80" width="12" height="12" rx="3" fill="#B8860B" />
      <Circle cx="76" cy="86" r="6" fill="#888" />
      <Line x1="73" y1="83" x2="79" y2="89" stroke="#555" strokeWidth="2" strokeLinecap="round" />
    </G>
  );
}

function BagAccessory() {
  return (
    <G>
      <Rect x="10" y="70" width="22" height="20" rx="6" fill="#C8A96E" />
      <Line x1="10" y1="76" x2="32" y2="76" stroke="#A0803A" strokeWidth="1" opacity="0.6" />
      <Line x1="10" y1="82" x2="32" y2="82" stroke="#A0803A" strokeWidth="1" opacity="0.6" />
      <Line x1="16" y1="70" x2="16" y2="90" stroke="#A0803A" strokeWidth="1" opacity="0.6" />
      <Line x1="26" y1="70" x2="26" y2="90" stroke="#A0803A" strokeWidth="1" opacity="0.6" />
      <Path d="M 16 70 Q 21 62 26 70" stroke="#8B6340" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </G>
  );
}

function GoldBangleAccessory() {
  return (
    <G>
      <Ellipse cx="16" cy="37" rx="9" ry="4" fill="none" stroke="#C9A800" strokeWidth="3.5" />
      <Ellipse cx="16" cy="44" rx="9" ry="4" fill="none" stroke="#D4AA00" strokeWidth="3.5" />
      <Ellipse cx="16" cy="51" rx="9" ry="4" fill="none" stroke="#C9A800" strokeWidth="3.5" />
      <Path d="M 11 35.5 Q 14 34 20 35.5" stroke="#F0D060" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <Path d="M 11 42.5 Q 14 41 20 42.5" stroke="#F0D060" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <Path d="M 11 49.5 Q 14 48 20 49.5" stroke="#F0D060" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </G>
  );
}

function LanternAccessory() {
  return (
    <G>
      <Line x1="80" y1="50" x2="80" y2="62" stroke="#8B4513" strokeWidth="1.5" />
      <Ellipse cx="80" cy="74" rx="10" ry="13" fill="#CC2222" />
      <Line x1="72" y1="68" x2="88" y2="68" stroke="#AA1111" strokeWidth="1.5" />
      <Line x1="70" y1="74" x2="90" y2="74" stroke="#AA1111" strokeWidth="1.5" />
      <Line x1="72" y1="80" x2="88" y2="80" stroke="#AA1111" strokeWidth="1.5" />
      <Line x1="80" y1="87" x2="78" y2="94" stroke="#FFD700" strokeWidth="1.5" />
      <Line x1="80" y1="87" x2="80" y2="95" stroke="#FFD700" strokeWidth="1.5" />
      <Line x1="80" y1="87" x2="82" y2="94" stroke="#FFD700" strokeWidth="1.5" />
    </G>
  );
}

// ── Clothing slot items ───────────────────────────────────────────────────────

function BatikShirtAccessory() {
  // Colourful batik shirt visible at chest and lower body
  return (
    <G>
      <Path d="M 16 82 Q 50 92 84 82 L 84 100 L 16 100 Z" fill="#1A3A8F" opacity="0.84" />
      <Path d="M 30 78 L 50 86 L 70 78" stroke="#142D6F" strokeWidth="2.5" fill="none" />
      <Path d="M 24 88 Q 27 84 30 88 Q 27 91 24 88 Z" fill="#F7A800" opacity="0.9" />
      <Path d="M 43 90 Q 46 86 49 90 Q 46 93 43 90 Z" fill="#F7A800" opacity="0.9" />
      <Path d="M 51 90 Q 54 86 57 90 Q 54 93 51 90 Z" fill="#F7A800" opacity="0.9" />
      <Path d="M 70 88 Q 73 84 76 88 Q 73 91 70 88 Z" fill="#F7A800" opacity="0.9" />
      <Circle cx="37" cy="89" r="1.5" fill="#F7D26E" opacity="0.85" />
      <Circle cx="63" cy="89" r="1.5" fill="#F7D26E" opacity="0.85" />
    </G>
  );
}

function KebayaAccessory() {
  return (
    <G>
      <Path d="M 18 80 L 50 95 L 50 99 L 16 84 Z" fill="#7C3D8F" opacity="0.9" />
      <Path d="M 82 80 L 50 95 L 50 99 L 84 84 Z" fill="#7C3D8F" opacity="0.9" />
      <Path d="M 18 80 L 50 95 L 50 99" stroke="#C9A800" strokeWidth="2" fill="none" />
      <Path d="M 82 80 L 50 95 L 50 99" stroke="#C9A800" strokeWidth="2" fill="none" />
      <Line x1="16" y1="84" x2="84" y2="84" stroke="#C9A800" strokeWidth="1.5" />
      <Circle cx="33" cy="84" r="2.8" fill="#F7D26E" />
      <Circle cx="33" cy="84" r="1.3" fill="#C9A800" />
      <Circle cx="67" cy="84" r="2.8" fill="#F7D26E" />
      <Circle cx="67" cy="84" r="1.3" fill="#C9A800" />
      <Circle cx="42" cy="89" r="2.5" fill="#F7D26E" />
      <Circle cx="58" cy="89" r="2.5" fill="#F7D26E" />
    </G>
  );
}

function SarongAccessory() {
  return (
    <G>
      <Path d="M 11 88 Q 50 97 89 88 L 89 100 L 11 100 Z" fill="#C0380A" />
      <Path d="M 22 91 L 25.5 88 L 29 91 L 25.5 94 Z" fill="#F7A800" />
      <Path d="M 40 93 L 43.5 90 L 47 93 L 43.5 96 Z" fill="#F7A800" />
      <Path d="M 53 93 L 56.5 90 L 60 93 L 56.5 96 Z" fill="#F7A800" />
      <Path d="M 71 91 L 74.5 88 L 78 91 L 74.5 94 Z" fill="#F7A800" />
      <Circle cx="35" cy="91.5" r="2" fill="#FFD066" opacity="0.9" />
      <Circle cx="65" cy="91.5" r="2" fill="#FFD066" opacity="0.9" />
      <Path d="M 11 88 Q 50 97 89 88" stroke="#7A1A00" strokeWidth="1.8" fill="none" />
    </G>
  );
}

function ChangshanAccessory() {
  // Traditional cheongsam/changshan with mandarin collar
  return (
    <G>
      <Path d="M 16 82 Q 50 92 84 82 L 84 100 L 16 100 Z" fill="#8B0000" opacity="0.88" />
      <Path d="M 36 78 L 36 84 Q 50 88 64 84 L 64 78 Q 50 74 36 78 Z" fill="#8B0000" />
      <Path d="M 36 78 Q 50 74 64 78 L 64 84 Q 50 88 36 84 Z" fill="none" stroke="#C9A800" strokeWidth="1.5" />
      <Line x1="50" y1="78" x2="50" y2="88" stroke="#C9A800" strokeWidth="1" opacity="0.6" />
      <Circle cx="50" cy="80" r="2.5" fill="#C9A800" />
      <Path d="M 47 80 Q 50 76 53 80" stroke="#C9A800" strokeWidth="1.5" fill="none" />
      <Circle cx="30" cy="88" r="3" fill="#FFD700" opacity="0.78" />
      <Circle cx="30" cy="88" r="1.5" fill="#C9A800" />
      <Circle cx="70" cy="88" r="3" fill="#FFD700" opacity="0.78" />
      <Circle cx="70" cy="88" r="1.5" fill="#C9A800" />
    </G>
  );
}

// ── Shoes slot items ──────────────────────────────────────────────────────────

function SneakersAccessory() {
  // Two white sneakers peeking from the bottom of the mochi
  return (
    <G>
      {/* left sneaker */}
      <Path d="M 18 100 L 18 95 L 44 92 L 44 100 Z" fill="#f2f2f2" />
      <Path d="M 36 92 Q 44 92 44 96 L 44 100 L 36 100 Z" fill="#E0E0E0" />
      <Path d="M 16 99 L 45 99 L 45 100 L 16 100 Z" fill="#BDBDBD" />
      <Line x1="22" y1="95.5" x2="37" y2="94" stroke="#999" strokeWidth="1" />
      <Line x1="24" y1="94.5" x2="24" y2="96.5" stroke="#999" strokeWidth="1" />
      <Line x1="30" y1="94" x2="30" y2="96" stroke="#999" strokeWidth="1" />
      <Line x1="36" y1="94" x2="36" y2="95.5" stroke="#999" strokeWidth="1" />
      <Path d="M 20 97 Q 30 93.5 41 96" stroke="#E8721A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* right sneaker */}
      <Path d="M 56 92 L 82 95 L 82 100 L 56 100 Z" fill="#f2f2f2" />
      <Path d="M 56 92 Q 64 92 64 96 L 64 100 L 56 100 Z" fill="#E0E0E0" />
      <Path d="M 55 99 L 84 99 L 84 100 L 55 100 Z" fill="#BDBDBD" />
      <Line x1="63" y1="94" x2="78" y2="95.5" stroke="#999" strokeWidth="1" />
      <Line x1="64" y1="94" x2="64" y2="96" stroke="#999" strokeWidth="1" />
      <Line x1="70" y1="94.5" x2="70" y2="96.5" stroke="#999" strokeWidth="1" />
      <Line x1="76" y1="95" x2="76" y2="97" stroke="#999" strokeWidth="1" />
      <Path d="M 59 96 Q 69 93.5 80 97" stroke="#E8721A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </G>
  );
}

function SandalsAccessory() {
  // Traditional leather sandals with ankle strap and gold buckle
  return (
    <G>
      {/* left sandal */}
      <Ellipse cx="31" cy="97" rx="13" ry="3.5" fill="#8B5E2A" />
      <Path d="M 24 94 Q 31 90 38 94" stroke="#5C3D1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Line x1="31" y1="90" x2="31" y2="97" stroke="#5C3D1E" strokeWidth="2" strokeLinecap="round" />
      <Line x1="19" y1="95" x2="42" y2="95" stroke="#6B4C2A" strokeWidth="1.8" strokeLinecap="round" />
      <Circle cx="19" cy="95" r="2.2" fill="#C9A800" />
      {/* right sandal */}
      <Ellipse cx="69" cy="97" rx="13" ry="3.5" fill="#8B5E2A" />
      <Path d="M 62 94 Q 69 90 76 94" stroke="#5C3D1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Line x1="69" y1="90" x2="69" y2="97" stroke="#5C3D1E" strokeWidth="2" strokeLinecap="round" />
      <Line x1="57" y1="95" x2="80" y2="95" stroke="#6B4C2A" strokeWidth="1.8" strokeLinecap="round" />
      <Circle cx="80" cy="95" r="2.2" fill="#C9A800" />
    </G>
  );
}

function SlippersAccessory() {
  // Nonya beaded kang kang slippers
  return (
    <G>
      {/* left slipper */}
      <Ellipse cx="31" cy="96.5" rx="13" ry="4.5" fill="#E8608A" />
      <Path d="M 21 93 Q 31 89.5 41 93" stroke="#C9A800" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Circle cx="25" cy="91.5" r="2.5" fill="#FFD700" />
      <Circle cx="31" cy="90" r="2.5" fill="#FFD700" />
      <Circle cx="37" cy="91.5" r="2.5" fill="#FFD700" />
      {/* right slipper */}
      <Ellipse cx="69" cy="96.5" rx="13" ry="4.5" fill="#E8608A" />
      <Path d="M 59 93 Q 69 89.5 79 93" stroke="#C9A800" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Circle cx="63" cy="91.5" r="2.5" fill="#FFD700" />
      <Circle cx="69" cy="90" r="2.5" fill="#FFD700" />
      <Circle cx="75" cy="91.5" r="2.5" fill="#FFD700" />
    </G>
  );
}

function WedgeHeelsAccessory() {
  // Peranakan beaded wedge heels
  return (
    <G>
      {/* left wedge */}
      <Path d="M 18 100 L 22 92 L 44 92 L 44 100 Z" fill="#7C3D8F" />
      <Path d="M 18 100 L 22 92 L 26 92 L 21 100 Z" fill="#534AB7" />
      <Path d="M 22 92 Q 33 87 44 92" stroke="#F7D26E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Circle cx="27" cy="89" r="2" fill="#F7D26E" />
      <Circle cx="33" cy="87.5" r="2" fill="#F7D26E" />
      <Circle cx="39" cy="89" r="2" fill="#F7D26E" />
      {/* right wedge */}
      <Path d="M 56 92 L 78 92 L 82 100 L 56 100 Z" fill="#7C3D8F" />
      <Path d="M 75 92 L 78 92 L 82 100 L 79 100 Z" fill="#534AB7" />
      <Path d="M 56 92 Q 67 87 78 92" stroke="#F7D26E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Circle cx="61" cy="89" r="2" fill="#F7D26E" />
      <Circle cx="67" cy="87.5" r="2" fill="#F7D26E" />
      <Circle cx="73" cy="89" r="2" fill="#F7D26E" />
    </G>
  );
}

// ── Component map ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ACCESSORY_COMPONENTS: Record<AccessoryId, any> = {
  none:        null,
  // hats
  bow:         BowAccessory,
  cap:         CapAccessory,
  beret:       BeretAccessory,
  hardhat:     HardhatAccessory,
  toast:       ToastAccessory,
  // accessories
  hairpin:     HairpinAccessory,
  jade:        JadeAccessory,
  bracelet:    BraceletAccessory,
  kerosang:    KerosangAccessory,
  toolbelt:    ToolbeltAccessory,
  bag:         BagAccessory,
  gold_bangle: GoldBangleAccessory,
  lantern:     LanternAccessory,
  // clothing
  batik_shirt: BatikShirtAccessory,
  kebaya:      KebayaAccessory,
  sarong:      SarongAccessory,
  changshan:   ChangshanAccessory,
  // shoes
  sneakers:    SneakersAccessory,
  sandals:     SandalsAccessory,
  slippers:    SlippersAccessory,
  wedge_heels: WedgeHeelsAccessory,
};

// ── Main component ────────────────────────────────────────────────────────────

interface MochiCharacterProps {
  accessory?: AccessoryId;        // single accessory (backwards compat)
  accessories?: AccessoryId[];    // multiple accessories rendered as layers
  size?: number;
}

export default function MochiCharacter({ accessory = 'none', accessories, size = 160 }: MochiCharacterProps) {
  // Use the array if provided, otherwise fall back to the single prop
  const layers: AccessoryId[] = accessories ?? (accessory !== 'none' ? [accessory] : []);

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">

      {/* ── Ears ── */}
      <Circle cx="18" cy="40" r="13" fill="#F5E6CE" />
      <Circle cx="82" cy="40" r="13" fill="#F5E6CE" />
      <Circle cx="18" cy="40" r="8" fill="#FDDBB4" opacity="0.4" />
      <Circle cx="82" cy="40" r="8" fill="#FDDBB4" opacity="0.4" />

      {/* ── Face ── */}
      <Circle cx="50" cy="58" r="40" fill="#FFF5E0" />
      <Circle cx="50" cy="58" r="40" fill="none" stroke="#E8D0A8" strokeWidth="1.5" />

      {/* ── Eyes ── */}
      <Ellipse cx="36" cy="54" rx="9" ry="10" fill="white" />
      <Ellipse cx="64" cy="54" rx="9" ry="10" fill="white" />
      <Ellipse cx="36" cy="55" rx="7" ry="8" fill="#1A1033" />
      <Ellipse cx="64" cy="55" rx="7" ry="8" fill="#1A1033" />
      <Circle cx="39.5" cy="51" r="2.5" fill="white" />
      <Circle cx="34" cy="57" r="1.2" fill="white" opacity="0.7" />
      <Circle cx="67.5" cy="51" r="2.5" fill="white" />
      <Circle cx="62" cy="57" r="1.2" fill="white" opacity="0.7" />

      {/* ── Cheeks ── */}
      <Ellipse cx="24" cy="66" rx="10" ry="7" fill="#FFB5C5" opacity="0.55" />
      <Ellipse cx="76" cy="66" rx="10" ry="7" fill="#FFB5C5" opacity="0.55" />

      {/* ── Smile ── */}
      <Path
        d="M 38 72 Q 50 83 62 72"
        stroke="#C49A6C"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── All accessory layers rendered together ── */}
      {layers.map(id => {
        const Comp = ACCESSORY_COMPONENTS[id];
        return Comp ? <Comp key={id} /> : null;
      })}

    </Svg>
  );
}

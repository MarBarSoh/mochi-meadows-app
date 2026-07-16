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
  | 'bow'
  | 'cap'
  | 'beret'
  | 'hardhat'
  | 'toast'
  | 'toolbelt'
  | 'bag'
  | 'lantern'
  | 'jade'
  | 'kebaya'
  | 'kerosang'
  | 'sarong'
  | 'gold_bangle';

// ── Accessory SVG overlays ───────────────────────────────────────────────────

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

// ── Peranakan & Heritage accessories ─────────────────────────────────────────

function JadeAccessory() {
  // Curved jade bead necklace with gold pendant below chin
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
      {/* gold pendant ring */}
      <Circle cx="50" cy="91.5" r="5.5" fill="none" stroke="#C9A800" strokeWidth="1.5" />
      <Circle cx="50" cy="91.5" r="2" fill="#F7E690" />
    </G>
  );
}

function KebayaAccessory() {
  // Peranakan kebaya — decorative V-neck collar with gold trim and floral embroidery
  return (
    <G>
      {/* left collar panel */}
      <Path d="M 18 80 L 50 95 L 50 99 L 16 84 Z" fill="#7C3D8F" opacity="0.9" />
      {/* right collar panel */}
      <Path d="M 82 80 L 50 95 L 50 99 L 84 84 Z" fill="#7C3D8F" opacity="0.9" />
      {/* gold trim edges */}
      <Path d="M 18 80 L 50 95 L 50 99" stroke="#C9A800" strokeWidth="2" fill="none" />
      <Path d="M 82 80 L 50 95 L 50 99" stroke="#C9A800" strokeWidth="2" fill="none" />
      {/* shoulder gold band */}
      <Line x1="16" y1="84" x2="84" y2="84" stroke="#C9A800" strokeWidth="1.5" />
      {/* floral embroidery dots */}
      <Circle cx="33" cy="84" r="2.8" fill="#F7D26E" />
      <Circle cx="33" cy="84" r="1.3" fill="#C9A800" />
      <Circle cx="67" cy="84" r="2.8" fill="#F7D26E" />
      <Circle cx="67" cy="84" r="1.3" fill="#C9A800" />
      <Circle cx="42" cy="89" r="2.5" fill="#F7D26E" />
      <Circle cx="58" cy="89" r="2.5" fill="#F7D26E" />
    </G>
  );
}

function KerosangAccessory() {
  // Nonya kerosang — 3 gold diamond brooches connected vertically at chest center
  return (
    <G>
      {/* top diamond */}
      <Path d="M 50 77 L 55 83 L 50 89 L 45 83 Z" fill="#C9A800" />
      <Path d="M 50 77 L 55 83 L 50 89 L 45 83 Z" fill="none" stroke="#8B7000" strokeWidth="0.8" />
      <Circle cx="50" cy="83" r="2.2" fill="#F0E0B0" />
      <Circle cx="48.5" cy="81.5" r="0.9" fill="white" opacity="0.85" />
      {/* connecting link */}
      <Rect x="49" y="89" width="2" height="3" fill="#B8940A" />
      {/* middle diamond */}
      <Path d="M 50 92 L 55 97.5 L 50 100 L 45 97.5 Z" fill="#C9A800" />
      <Path d="M 50 92 L 55 97.5 L 50 100 L 45 97.5 Z" fill="none" stroke="#8B7000" strokeWidth="0.8" />
      <Circle cx="50" cy="97" r="2" fill="#F0E0B0" />
      <Circle cx="48.5" cy="95.5" r="0.8" fill="white" opacity="0.85" />
    </G>
  );
}

function SarongAccessory() {
  // Batik sarong — geometric diamond-patterned band at lower body
  return (
    <G>
      {/* base sarong band */}
      <Path d="M 11 88 Q 50 97 89 88 L 89 100 L 11 100 Z" fill="#C0380A" />
      {/* batik diamond motifs */}
      <Path d="M 22 91 L 25.5 88 L 29 91 L 25.5 94 Z" fill="#F7A800" />
      <Path d="M 40 93 L 43.5 90 L 47 93 L 43.5 96 Z" fill="#F7A800" />
      <Path d="M 53 93 L 56.5 90 L 60 93 L 56.5 96 Z" fill="#F7A800" />
      <Path d="M 71 91 L 74.5 88 L 78 91 L 74.5 94 Z" fill="#F7A800" />
      {/* accent dots */}
      <Circle cx="35" cy="91.5" r="2" fill="#FFD066" opacity="0.9" />
      <Circle cx="65" cy="91.5" r="2" fill="#FFD066" opacity="0.9" />
      {/* upper border */}
      <Path d="M 11 88 Q 50 97 89 88" stroke="#7A1A00" strokeWidth="1.8" fill="none" />
    </G>
  );
}

function GoldBangleAccessory() {
  // Gold bangles stacked on the left ear/side area
  return (
    <G>
      <Ellipse cx="16" cy="37" rx="9" ry="4" fill="none" stroke="#C9A800" strokeWidth="3.5" />
      <Ellipse cx="16" cy="44" rx="9" ry="4" fill="none" stroke="#D4AA00" strokeWidth="3.5" />
      <Ellipse cx="16" cy="51" rx="9" ry="4" fill="none" stroke="#C9A800" strokeWidth="3.5" />
      {/* shine highlights */}
      <Path d="M 11 35.5 Q 14 34 20 35.5" stroke="#F0D060" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <Path d="M 11 42.5 Q 14 41 20 42.5" stroke="#F0D060" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <Path d="M 11 49.5 Q 14 48 20 49.5" stroke="#F0D060" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </G>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ACCESSORY_COMPONENTS: Record<AccessoryId, any> = {
  none:        null,
  bow:         BowAccessory,
  cap:         CapAccessory,
  beret:       BeretAccessory,
  hardhat:     HardhatAccessory,
  toast:       ToastAccessory,
  toolbelt:    ToolbeltAccessory,
  bag:         BagAccessory,
  lantern:     LanternAccessory,
  jade:        JadeAccessory,
  kebaya:      KebayaAccessory,
  kerosang:    KerosangAccessory,
  sarong:      SarongAccessory,
  gold_bangle: GoldBangleAccessory,
};

// ── Main component ───────────────────────────────────────────────────────────

interface MochiCharacterProps {
  accessory?: AccessoryId;
  size?: number;
}

export default function MochiCharacter({ accessory = 'none', size = 160 }: MochiCharacterProps) {
  const AccessoryEl = ACCESSORY_COMPONENTS[accessory];

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

      {/* ── Accessory layer (rendered on top) ── */}
      {AccessoryEl && <AccessoryEl />}

    </Svg>
  );
}

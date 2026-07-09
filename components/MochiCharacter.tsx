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
  | 'lantern';

// ── Accessory SVG overlays ───────────────────────────────────────────────────

function BowAccessory() {
  // Pink bow, top-right of head
  return (
    <G>
      {/* left petal */}
      <Path d="M 58 14 Q 50 8 46 18 Q 52 20 58 14 Z" fill="#E8608A" />
      {/* right petal */}
      <Path d="M 58 14 Q 66 8 70 18 Q 64 20 58 14 Z" fill="#E8608A" />
      {/* center knot */}
      <Circle cx="58" cy="16" r="4" fill="#D4708A" />
      {/* ribbon tails */}
      <Path d="M 55 18 Q 50 26 48 24" stroke="#E8608A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Path d="M 61 18 Q 66 26 68 24" stroke="#E8608A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </G>
  );
}

function CapAccessory() {
  // Brown flat Kapitan beret — matches the reference image exactly
  return (
    <G>
      {/* beret dome */}
      <Path d="M 20 30 Q 22 10 50 8 Q 78 10 80 30 Z" fill="#8B6340" />
      {/* beret brim / band */}
      <Ellipse cx="50" cy="30" rx="32" ry="8" fill="#6B4C2A" />
      {/* top button */}
      <Circle cx="50" cy="10" r="4" fill="#6B4C2A" />
    </G>
  );
}

function BeretAccessory() {
  // Purple-blue artist beret
  return (
    <G>
      {/* dome */}
      <Path d="M 24 30 Q 26 8 50 6 Q 74 8 76 30 Z" fill="#534AB7" />
      {/* brim */}
      <Ellipse cx="50" cy="30" rx="30" ry="7" fill="#3B348A" />
      {/* top button */}
      <Circle cx="50" cy="8" r="4" fill="#3B348A" />
    </G>
  );
}

function HardhatAccessory() {
  // Yellow construction hardhat
  return (
    <G>
      {/* dome */}
      <Path d="M 20 32 Q 22 8 50 6 Q 78 8 80 32 Z" fill="#F5C518" />
      {/* brim */}
      <Rect x="16" y="28" width="68" height="8" rx="4" fill="#D4A800" />
      {/* stripe */}
      <Rect x="44" y="6" width="12" height="26" rx="3" fill="#D4A800" opacity="0.4" />
    </G>
  );
}

function ToastAccessory() {
  // Kaya toast hat — a slice of toast
  return (
    <G>
      {/* toast base */}
      <Rect x="28" y="10" width="44" height="28" rx="6" fill="#C8965A" />
      {/* toast crust darker */}
      <Rect x="28" y="10" width="44" height="6" rx="6" fill="#A0723A" />
      <Rect x="28" y="32" width="44" height="6" rx="4" fill="#A0723A" />
      {/* kaya green spread */}
      <Rect x="30" y="18" width="40" height="12" rx="3" fill="#7CB87A" opacity="0.8" />
      {/* hat band */}
      <Ellipse cx="50" cy="38" rx="28" ry="5" fill="#8B5E2A" />
    </G>
  );
}

function ToolbeltAccessory() {
  // Small toolbelt + wrench, sits lower-right (decorative overlay)
  return (
    <G>
      {/* belt strap across body */}
      <Rect x="20" y="82" width="60" height="8" rx="4" fill="#5C3D1E" />
      {/* buckle */}
      <Rect x="44" y="80" width="12" height="12" rx="3" fill="#B8860B" />
      {/* wrench icon on right hip */}
      <Circle cx="76" cy="86" r="6" fill="#888" />
      <Line x1="73" y1="83" x2="79" y2="89" stroke="#555" strokeWidth="2" strokeLinecap="round" />
    </G>
  );
}

function BagAccessory() {
  // Rattan bag, hanging left side
  return (
    <G>
      {/* bag body */}
      <Rect x="10" y="70" width="22" height="20" rx="6" fill="#C8A96E" />
      {/* rattan weave lines */}
      <Line x1="10" y1="76" x2="32" y2="76" stroke="#A0803A" strokeWidth="1" opacity="0.6" />
      <Line x1="10" y1="82" x2="32" y2="82" stroke="#A0803A" strokeWidth="1" opacity="0.6" />
      <Line x1="16" y1="70" x2="16" y2="90" stroke="#A0803A" strokeWidth="1" opacity="0.6" />
      <Line x1="26" y1="70" x2="26" y2="90" stroke="#A0803A" strokeWidth="1" opacity="0.6" />
      {/* handle */}
      <Path d="M 16 70 Q 21 62 26 70" stroke="#8B6340" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </G>
  );
}

function LanternAccessory() {
  // Red heritage lantern, held right side
  return (
    <G>
      {/* string */}
      <Line x1="80" y1="50" x2="80" y2="62" stroke="#8B4513" strokeWidth="1.5" />
      {/* lantern body */}
      <Ellipse cx="80" cy="74" rx="10" ry="13" fill="#CC2222" />
      {/* lantern bands */}
      <Line x1="72" y1="68" x2="88" y2="68" stroke="#AA1111" strokeWidth="1.5" />
      <Line x1="70" y1="74" x2="90" y2="74" stroke="#AA1111" strokeWidth="1.5" />
      <Line x1="72" y1="80" x2="88" y2="80" stroke="#AA1111" strokeWidth="1.5" />
      {/* tassel */}
      <Line x1="80" y1="87" x2="78" y2="94" stroke="#FFD700" strokeWidth="1.5" />
      <Line x1="80" y1="87" x2="80" y2="95" stroke="#FFD700" strokeWidth="1.5" />
      <Line x1="80" y1="87" x2="82" y2="94" stroke="#FFD700" strokeWidth="1.5" />
    </G>
  );
}

const ACCESSORY_COMPONENTS: Record<AccessoryId, (() => JSX.Element) | null> = {
  none:     null,
  bow:      BowAccessory,
  cap:      CapAccessory,
  beret:    BeretAccessory,
  hardhat:  HardhatAccessory,
  toast:    ToastAccessory,
  toolbelt: ToolbeltAccessory,
  bag:      BagAccessory,
  lantern:  LanternAccessory,
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
      {/* inner ear tint */}
      <Circle cx="18" cy="40" r="8" fill="#FDDBB4" opacity="0.4" />
      <Circle cx="82" cy="40" r="8" fill="#FDDBB4" opacity="0.4" />

      {/* ── Face ── */}
      <Circle cx="50" cy="58" r="40" fill="#FFF5E0" />
      {/* subtle face shadow / depth */}
      <Circle cx="50" cy="58" r="40" fill="none" stroke="#E8D0A8" strokeWidth="1.5" />

      {/* ── Eyes ── */}
      {/* left eye white */}
      <Ellipse cx="36" cy="54" rx="9" ry="10" fill="white" />
      {/* right eye white */}
      <Ellipse cx="64" cy="54" rx="9" ry="10" fill="white" />
      {/* left pupil */}
      <Ellipse cx="36" cy="55" rx="7" ry="8" fill="#1A1033" />
      {/* right pupil */}
      <Ellipse cx="64" cy="55" rx="7" ry="8" fill="#1A1033" />
      {/* eye shine — left */}
      <Circle cx="39.5" cy="51" r="2.5" fill="white" />
      <Circle cx="34" cy="57" r="1.2" fill="white" opacity="0.7" />
      {/* eye shine — right */}
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

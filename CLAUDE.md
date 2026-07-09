# Mochi Meadows — Mobile App Project

## What this is
Mochi Meadows is a free mobile game for iOS & Android (React Native / Expo) that brings Jalan Besar's heritage to life. Players explore the neighbourhood through 4 real-world heritage activities, earn Mochi accessories, and build a personal Mochi character as they discover the area.

This is a school project (Ngee Ann Polytechnic, PRO ID module) in partnership with URA. Group: Mochi Meadows (Rayden, Matthew, Rynee, Richard, Jammy).

## Target audience
Youths aged 15–25, Singapore residents — digital natives who discover places through apps and social media.

## Color palette
```
dark:   #1A1033   (primary dark bg)
pink:   #D4708A   (primary accent)
lpink:  #FFB5C5   (light pink, labels)
white:  #FFFFFF
grey:   #555555
lgrey:  #888888

blue:   dark #0C447C | mid #185FA5 | bg #EBF4FF | light #B5D4F4
amber:  dark #412402 | mid #BA7517 | bg #FFF9EE | light #FAD090
purple: dark #26215C | mid #534AB7 | bg #F5F0FF | light #C0AAEE
teal:   dark #04342C | mid #0F6E56 | bg #EDFFF6 | light #88DDBB
```

## The 4 heritage activities (each has its own color theme)
1. **Time Travelling** (blue) — Match archival photos of Jalan Besar landmarks to real-life spots. Scan QR at site.
2. **Bring Back the Food** (amber) — Visit heritage hawker stalls, scan QR after purchase. Complete groups of 3 for CDC vouchers.
3. **Recreate the Art** (purple) — Find murals, photograph Mochi at them via AR camera, submit own artwork to community gallery.
4. **Meet the Maker** (teal) — Visit traditional trade shops, complete a discovery challenge, scan shop QR.

## Key screens to build (priority order)
1. **Home / Map screen** — Interactive map of Jalan Besar with activity waypoints, active trails list, nearby activities
2. **Mochi Profile screen** — Player's Mochi avatar, accessory count, activity progress, Meadow Level, Customise button
3. **Achievement Book screen** — Food trail checklist (Swee Choon, Sungei Rd Laksa, Beach Rd Curry Rice), reward display
4. **Activity Detail screen** — Step-by-step how-it-works for each activity, heritage connection, reward preview
5. **QR Scanner screen** — Camera view for scanning waypoint QR codes
6. **Community Gallery screen** — Grid of submitted artworks for Recreate the Art
7. **Onboarding / Mochi creation screen** — New player flow, choose starter Mochi

## Mochi characters (used across the app)
- Kapitan Mochi — wears a brown beret/captain's cap (Time Travelling activity)
- Bow Mochi — wears a pink bow (Bring Back the Food / Recreate the Art)
- Plain Mochi — no accessories (neutral / onboarding)
- Hardhat Mochi — wears a yellow hardhat (Meet the Maker activity)

Image assets are PNGs in the `/assets` folder.

## Activity → color mapping
- Time Travelling → blue theme (#185FA5)
- Bring Back the Food → amber theme (#BA7517)
- Recreate the Art → purple theme (#534AB7)
- Meet the Maker → teal theme (#0F6E56)

## Heritage businesses featured in the app
- Swee Choon Dim Sum (est. 1962) — Food Trail
- Sungei Road Laksa — Food Trail
- Beach Road Curry Rice — Food Trail
- Rad Son Lighting (est. 2006) — Meet the Maker
- Various art workshops and murals around Jalan Besar

## Rewards system
- Mochi accessories (e.g. Kapitan Cap, kaya toast hat, artist beret, rattan bag, toolbelt)
- CDC Vouchers on completing food trail groups
- Community gallery features for top-rated art submissions
- Meadow progression (levels, biomes unlock)

## Tech stack
- **Expo 57** + **React Native 0.86** + **React 19**
- **Expo Router 5** (file-based routing, `expo-router/entry` as main)
- **TypeScript** with `strict: true`
- **React Native StyleSheet** (no NativeWind — keep it simple)
- `react-native-safe-area-context` for safe area insets
- Web bundler: Metro (`expo start --web --port 8081`)

## Design notes
- Rounded corners everywhere (borderRadius 12–20)
- Cards with colored tinted backgrounds matching activity color
- Section labels in small spaced caps (e.g. `HERO ACTIVITY`, `HOW IT WORKS`)
- Ghost/transparency effects on backgrounds (semi-transparent overlays)
- Mochi emoji appears top-right of activity cards (large, low opacity, decorative)
- White icons on colored circle backgrounds for activity icons
- **Dark app background:** `#1A1033` throughout
- **Never use apostrophes inside single-quoted JS strings** — use double quotes for strings containing `'` (e.g. `"that's"` not `'that\'s'`)

## Existing file map — ALWAYS EDIT these files, never create duplicates

```
mochi-meadows-app/
├── app/
│   ├── _layout.tsx          # Root layout + phone frame wrapper for web
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab bar (Explore 🗺️ / Trail Book 📖 / My Mochi 🍡)
│   │   ├── index.tsx        # Home / Map screen (hero: Bring Back the Food)
│   │   ├── achievements.tsx # Trail Book — food trail checklist + reward vault
│   │   └── profile.tsx      # My Mochi — character, accessories, stats, meadow
│   └── activity/
│       └── [id].tsx         # Activity detail screen (id: food | time | art | maker)
├── constants/
│   └── colors.ts            # Full color palette + activityColors map
├── components/              # Empty — add shared components here
├── assets/                  # Expo default assets (icon, splash, etc.)
├── app.json                 # scheme: mochi-meadows, web bundler: metro
├── babel.config.js          # babel-preset-expo
└── package.json             # main: expo-router/entry
```

## Screen status (what's built)

| Screen | File | Status |
|---|---|---|
| Home / Map | `app/(tabs)/index.tsx` | ✅ Built |
| Trail Book | `app/(tabs)/achievements.tsx` | ✅ Built |
| My Mochi | `app/(tabs)/profile.tsx` | ✅ Built |
| Activity Detail (all 4) | `app/activity/[id].tsx` | ✅ Built |
| QR Scanner | — | ❌ Not yet |
| Community Gallery | — | ❌ Not yet |
| Onboarding | — | ❌ Not yet |

## Activity data (lives in `app/activity/[id].tsx`)
All four activities are defined in `ACTIVITY_DATA` as a keyed object (`food`, `time`, `art`, `maker`). To add or edit activity content (stalls, steps, tips, rewards), edit that object directly — do not create new files.

## Phone frame (web demo)
`app/_layout.tsx` wraps content in a `390×844` phone bezel when `Platform.OS === 'web'`. Run with `npx expo start --web --port 8081`. The frame is purely decorative CSS — do not remove it.

## Survey findings that drive design decisions
(From 113-response validation survey, July 2026)
- **Bring Back the Food** is the hero activity — always give it priority placement
- **CDC Vouchers** are the #1 motivator — keep them visible and prominent everywhere
- **Recreate the Art** is least popular — do not give it hero status or a prominent map pin
- Most respondents do **not** visit JB regularly — onboarding must frame the app as a reason to visit for the first time
- Respondents want it **simple and not grindy** — keep trail lengths short (3 stalls is correct scope)

# Samyaflix — Change Requests v2.0
> V2 upgrades. Apply all 4 changes. These are more complex than v1 — read each section fully before implementing.

---

## Change 1 — UI/UX Polish: Make It Feel More Like a Real Netflix Clone

### 1a — Navbar Improvements
- Add a **scroll effect**: when user scrolls down more than 50px, navbar background changes from gradient-to-transparent → solid black (`bg-black`). Use a `useEffect` + `scroll` event listener.
- Nav links should have a **bottom border indicator** on the active view (like Netflix's active tab underline)
- Add a **hover underline animation** on nav links using `after:` pseudo-element that slides in from left on hover

```jsx
// Scroll effect in Navbar.jsx
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50)
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

<nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
  scrolled ? 'bg-black' : 'bg-gradient-to-b from-black/90 to-transparent'
}`}>
```

### 1b — Hero Section Polish
- **Play button**: add a subtle `scale(1.05)` on hover + a white glow shadow (`hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]`)
- **More Info button**: same scale effect, semi-transparent background should darken on hover
- Add a **floating confetti particle effect** (CSS-only or lightweight JS) in the hero — tiny dots floating upward subtly in the background
- The hero background image should have a **Ken Burns effect** — very slow zoom in (`scale: 1 → 1.05` over 20 seconds) using a CSS keyframe animation:

```css
@keyframes kenBurns {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}
.hero-bg {
  animation: kenBurns 20s ease-in-out infinite alternate;
}
```

### 1c — Content Row Cards Polish
- Add **left/right arrow buttons** (`ChevronLeft`, `ChevronRight` from Lucide) on each row that appear only on hover of the row container
- On card hover, show a **mini info popup** above/below the card with: card title, a small star rating, and a mini Play button — like Netflix's hover card preview
- Cards should have a **smooth reveal** — when the page loads, cards slide in from the right with staggered delay using Framer Motion

```jsx
// Arrow buttons on row hover
<div className="group relative">
  <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition bg-black/70 hover:bg-black p-2 rounded-r-md">
    <ChevronLeft className="text-white" size={24} />
  </button>
  {/* scrollable cards */}
  <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition bg-black/70 hover:bg-black p-2 rounded-l-md">
    <ChevronRight className="text-white" size={24} />
  </button>
</div>
```

### 1d — Compliments Page Polish
- Each card should have a **shimmer loading effect** when first rendered (CSS skeleton animation before content appears)
- Add a **"Liked" count** next to the thumbs-up button that increments on click (local state only)
- Cards should slightly **lift** on hover (`translateY(-4px)` + deeper shadow)

### 1e — Profile Selection Page Polish
- Add a **fade-in entrance animation** for the whole profile screen on mount
- Add a **"Netflix intro" style animation** — a brief red flash/fade before the profile page appears (optional, 0.5s)
- Profile cards should have a **name tooltip** appear on hover (already somewhat done, just make it more polished)

### 1f — General Micro-interactions
- All clickable elements must have `cursor-pointer`
- Add `transition-all duration-200` to every interactive element that doesn't already have it
- The **bell icon** in the navbar should have a red dot notification badge (already exists, keep it)
- Add a **toast notification** when the user likes a compliment card: `"❤️ Marked as helpful!"` — appears bottom-right, fades out after 2 seconds

```jsx
// Simple toast component
const Toast = ({ message, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-8 right-8 bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm z-50"
      >
        {message}
      </motion.div>
    )}
  </AnimatePresence>
)
```

---

## Change 2 — Video Player: Full Netflix-Style Interface

**This is the biggest change in v2. Replace the current video modal with a proper full-screen Netflix-style player.**

### 2a — Full Screen Layout
- The modal must be **truly fullscreen**: `position: fixed`, `inset: 0`, `width: 100vw`, `height: 100vh`, `background: black`, `z-index: 9999`
- The video element itself must be `w-full h-full object-contain` — filling the entire screen
- **No bordered box**, no centred card — the video IS the entire screen, exactly like image 5

### 2b — Netflix Player Controls Bar
Build a custom controls bar that appears at the **bottom of the screen** and **auto-hides after 3 seconds of inactivity** (reset timer on mouse move).

Controls bar layout (exactly like Netflix — reference image 5):

```
[Progress Bar — full width, red fill, white scrubber dot]

[▶ Play] [↺10 Back] [↻10 Forward] [🔊 Volume]     [Title — center]     [⧉ Episodes] [💬 Subtitles] [⚡ Speed] [⛶ Fullscreen]
```

**Left controls:**
- `Play/Pause` button — toggles between `Play` and `Pause` Lucide icons
- `SkipBack` 10s button — with "10" label overlaid
- `SkipForward` 10s button — with "10" label overlaid
- `Volume2` / `VolumeX` toggle button

**Center:**
- Show title: `"🎂 Samya's Birthday Reel — Happy Birthday"`

**Right controls:**
- Episodes icon (`LayoutGrid` from Lucide) — decorative only
- Subtitles icon (`MessageSquare` from Lucide) — decorative only
- Speed icon (`Gauge` from Lucide) — decorative only
- Fullscreen icon (`Maximize` from Lucide) — calls `videoRef.current.requestFullscreen()`

### 2c — Progress Bar
- A **full-width** thin progress bar above the controls
- Red fill (`bg-red-600`) showing how far through the video we are
- A **white circle scrubber dot** at the current position
- Clicking/dragging on the bar seeks to that position
- On hover: bar grows slightly taller (`h-1 → h-1.5`)

```jsx
// Progress bar
<div
  className="w-full h-1 bg-zinc-600 relative cursor-pointer group"
  onClick={(e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = ratio * videoRef.current.duration
  }}
>
  <div
    className="h-full bg-red-600 relative"
    style={{ width: `${progress}%` }}
  >
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100" />
  </div>
</div>
```

### 2d — Back Arrow (Top Left)
- A `←` arrow icon (`ArrowLeft` from Lucide) in the **top-left corner** — always visible, not part of the auto-hide controls
- On click: closes the modal (sets `isModalOpen` to false)
- Style: white icon, subtle background `bg-black/30 hover:bg-black/60`, rounded

### 2e — Auto-hide Controls Logic
```jsx
const [showControls, setShowControls] = useState(true)
const hideTimer = useRef(null)

const handleMouseMove = () => {
  setShowControls(true)
  clearTimeout(hideTimer.current)
  hideTimer.current = setTimeout(() => setShowControls(false), 3000)
}

// Attach to the modal wrapper
<div onMouseMove={handleMouseMove} className="relative w-screen h-screen bg-black">
  <video ... />
  {/* Back arrow — always visible */}
  <button className="absolute top-4 left-4 z-50 ..."><ArrowLeft /></button>
  {/* Controls — auto-hide */}
  <div className={`absolute bottom-0 w-full transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
    {/* progress bar + controls bar */}
  </div>
</div>
```

### 2f — Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `ArrowLeft` | Skip back 10s |
| `ArrowRight` | Skip forward 10s |
| `ArrowUp` | Volume up |
| `ArrowDown` | Volume down |
| `Escape` | Close modal |
| `F` | Toggle fullscreen |
| `M` | Toggle mute |

```jsx
useEffect(() => {
  const handleKey = (e) => {
    switch(e.key) {
      case ' ': togglePlay(); break
      case 'ArrowLeft': skipBack(); break
      case 'ArrowRight': skipForward(); break
      case 'Escape': closeModal(); break
      case 'f': toggleFullscreen(); break
      case 'm': toggleMute(); break
    }
  }
  window.addEventListener('keydown', handleKey)
  return () => window.removeEventListener('keydown', handleKey)
}, [])
```

---

## Change 3 — Content Rows: Circular/Loop Scrolling Like Netflix

**When the user reaches the last card in a row and clicks "Next", it loops back to show the first cards again — like Netflix's infinite carousel.**

### 3a — Replace `overflow-x-auto` with a Controlled Slider

Stop using native horizontal scroll. Replace with a **controlled index-based slider**:

```jsx
// State per row
const [startIndex, setStartIndex] = useState(0)
const VISIBLE_CARDS = 6 // how many cards visible at once

const handleNext = () => {
  setStartIndex((prev) => (prev + 1) % cards.length)
}
const handlePrev = () => {
  setStartIndex((prev) => (prev - 1 + cards.length) % cards.length)
}

// Slice cards circularly
const visibleCards = [...cards, ...cards].slice(startIndex, startIndex + VISIBLE_CARDS)
```

### 3b — Smooth Slide Animation
- When clicking next/prev, cards should **slide horizontally** with a smooth animation
- Use Framer Motion's `AnimatePresence` with `x` slide:

```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={startIndex}
    initial={{ x: direction === 'next' ? 300 : -300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: direction === 'next' ? -300 : 300, opacity: 0 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
    className="flex gap-3"
  >
    {visibleCards.map(card => <MovieCard key={card.id} data={card} />)}
  </motion.div>
</AnimatePresence>
```

### 3c — Arrow Button Behaviour
- Left arrow: always visible (since it loops, there's always a "previous")
- Right arrow: always visible (infinite loop)
- Arrows appear on hover of the row container (`group-hover:opacity-100`)
- Arrows should be **tall**, spanning the full card height, flush to the row edges
- Left arrow: `absolute left-0`, right arrow: `absolute right-0`
- Arrow background: `bg-black/70 hover:bg-black` with slight padding

### 3d — Row Position Indicators (Dots)
- Above the right arrow, show small dash indicators (like Netflix) showing position in the row:

```jsx
// Position dots above right arrow
<div className="absolute top-0 right-12 flex gap-1">
  {Array.from({ length: Math.ceil(cards.length / VISIBLE_CARDS) }).map((_, i) => (
    <div key={i} className={`h-0.5 w-4 rounded ${
      Math.floor(startIndex / VISIBLE_CARDS) === i ? 'bg-white' : 'bg-zinc-600'
    }`} />
  ))}
</div>
```

---

## Change 4 — Media Folder Structure: Easy Image & Video Swapping

**Create a dedicated `media/` folder inside `src/` with a single config file. To change any image or video, you only edit ONE file.**

### 4a — Folder Structure to Create

```
src/
└── media/
    ├── images/
    │   ├── profile/
    │   │   └── samya.jpg          ← Samya's profile photo
    │   ├── hero/
    │   │   └── hero-bg.jpg        ← Hero section background image
    │   ├── sweet-memories/
    │   │   ├── cafe-days.jpg
    │   │   ├── squad-goals.jpg
    │   │   ├── ice-cream-dates.jpg
    │   │   ├── golden-hour.jpg
    │   │   ├── just-us.jpg
    │   │   └── forever-vibes.jpg
    │   ├── drama/
    │   │   ├── emotional.jpg
    │   │   ├── over-dramatic.jpg
    │   │   ├── the-argument.jpg
    │   │   ├── plot-twist.jpg
    │   │   ├── crying-laughing.jpg
    │   │   └── main-character.jpg
    │   ├── comedy/
    │   │   ├── chaotic-energy.jpg
    │   │   ├── cursed-photo.jpg
    │   │   ├── the-face.jpg
    │   │   ├── send-help.jpg
    │   │   ├── no-context.jpg
    │   │   └── unhinged.jpg
    │   └── moments/
    │       ├── milestone-1.jpg
    │       ├── milestone-2.jpg
    │       ├── milestone-3.jpg
    │       ├── milestone-4.jpg
    │       ├── milestone-5.jpg
    │       └── milestone-6.jpg
    └── videos/
        └── birthday-reel.mp4      ← The main birthday video
```

### 4b — Single Media Config File

Create `src/media/mediaConfig.js` — **this is the ONLY file you need to edit to swap any image or video**:

```js
// src/media/mediaConfig.js
// ─────────────────────────────────────────────
// SAMYAFLIX MEDIA CONFIG
// To change any image or video, just update the
// import path below. That's it.
// ─────────────────────────────────────────────

// ── PROFILE ──────────────────────────────────
import samyaPhoto from './images/profile/samya.jpg'

// ── HERO ─────────────────────────────────────
import heroBg from './images/hero/hero-bg.jpg'

// ── VIDEO ────────────────────────────────────
import birthdayReel from './videos/birthday-reel.mp4'

// ── SWEET MEMORIES ROW ───────────────────────
import cafeDays from './images/sweet-memories/cafe-days.jpg'
import squadGoals from './images/sweet-memories/squad-goals.jpg'
import iceCreamDates from './images/sweet-memories/ice-cream-dates.jpg'
import goldenHour from './images/sweet-memories/golden-hour.jpg'
import justUs from './images/sweet-memories/just-us.jpg'
import foreverVibes from './images/sweet-memories/forever-vibes.jpg'

// ── DRAMA ROW ────────────────────────────────
import emotional from './images/drama/emotional.jpg'
import overDramatic from './images/drama/over-dramatic.jpg'
import theArgument from './images/drama/the-argument.jpg'
import plotTwist from './images/drama/plot-twist.jpg'
import cryingLaughing from './images/drama/crying-laughing.jpg'
import mainCharacter from './images/drama/main-character.jpg'

// ── COMEDY ROW ───────────────────────────────
import chaoticEnergy from './images/comedy/chaotic-energy.jpg'
import cursedPhoto from './images/comedy/cursed-photo.jpg'
import theFace from './images/comedy/the-face.jpg'
import sendHelp from './images/comedy/send-help.jpg'
import noContext from './images/comedy/no-context.jpg'
import unhinged from './images/comedy/unhinged.jpg'

// ── UNFORGETTABLE MOMENTS ROW ─────────────────
import milestone1 from './images/moments/milestone-1.jpg'
import milestone2 from './images/moments/milestone-2.jpg'
import milestone3 from './images/moments/milestone-3.jpg'
import milestone4 from './images/moments/milestone-4.jpg'
import milestone5 from './images/moments/milestone-5.jpg'
import milestone6 from './images/moments/milestone-6.jpg'

// ─────────────────────────────────────────────
// EXPORTED MEDIA OBJECT
// Import this in any component: import { media } from '../media/mediaConfig'
// ─────────────────────────────────────────────
export const media = {
  profile: {
    samya: samyaPhoto,
  },
  hero: {
    background: heroBg,
  },
  video: {
    birthdayReel: birthdayReel,
  },
  rows: {
    sweetMemories: [
      { id: 1, title: 'Café Days',        src: cafeDays },
      { id: 2, title: 'Squad Goals',       src: squadGoals },
      { id: 3, title: 'Ice Cream Dates',   src: iceCreamDates },
      { id: 4, title: 'Golden Hour',       src: goldenHour },
      { id: 5, title: 'Just Us',           src: justUs },
      { id: 6, title: 'Forever Vibes',     src: foreverVibes },
    ],
    drama: [
      { id: 1, title: 'Emotional',         src: emotional },
      { id: 2, title: 'Over Dramatic',     src: overDramatic },
      { id: 3, title: 'The Argument',      src: theArgument },
      { id: 4, title: 'Plot Twist',        src: plotTwist },
      { id: 5, title: 'Crying Laughing',   src: cryingLaughing },
      { id: 6, title: 'Main Character',    src: mainCharacter },
    ],
    comedy: [
      { id: 1, title: 'Chaotic Energy',    src: chaoticEnergy },
      { id: 2, title: 'Cursed Photo',      src: cursedPhoto },
      { id: 3, title: 'The Face',          src: theFace },
      { id: 4, title: 'Send Help',         src: sendHelp },
      { id: 5, title: 'No Context',        src: noContext },
      { id: 6, title: 'Unhinged',          src: unhinged },
    ],
    moments: [
      { id: 1, title: 'Milestone 1',       src: milestone1 },
      { id: 2, title: 'Milestone 2',       src: milestone2 },
      { id: 3, title: 'Milestone 3',       src: milestone3 },
      { id: 4, title: 'Milestone 4',       src: milestone4 },
      { id: 5, title: 'Milestone 5',       src: milestone5 },
      { id: 6, title: 'Milestone 6',       src: milestone6 },
    ],
  },
}
```

### 4c — How to Use in Components

```jsx
// In any component, just do:
import { media } from '../media/mediaConfig'

// Use Samya's photo:
<img src={media.profile.samya} />

// Use hero background:
<div style={{ backgroundImage: `url(${media.hero.background})` }} />

// Use video:
<video src={media.video.birthdayReel} />

// Use a row's cards:
{media.rows.sweetMemories.map(card => (
  <MovieCard key={card.id} title={card.title} image={card.src} />
))}
```

### 4d — How to Swap an Image (Instructions for Non-Dev Use)

```
TO CHANGE ANY IMAGE:
1. Drop your new image file into the correct folder inside src/media/images/
2. Open src/media/mediaConfig.js
3. Find the import line for the image you want to replace
4. Change the filename in the import path to your new file's name
5. Save — the website auto-updates instantly (hot reload)

EXAMPLE:
// Before:
import samyaPhoto from './images/profile/samya.jpg'

// After (if you renamed the file to samya-new.jpg):
import samyaPhoto from './images/profile/samya-new.jpg'

TO CHANGE THE VIDEO:
1. Drop your new .mp4 file into src/media/videos/
2. Open src/media/mediaConfig.js
3. Change the video import filename
4. Save

SUPPORTED FORMATS: JPG, PNG, WebP for images. MP4 for video.
```

### 4e — Vite Config Note
If using Vite (recommended), video and image imports work out of the box. No extra config needed. If you see import errors for `.mp4` files, add this to `vite.config.js`:

```js
// vite.config.js
export default {
  assetsInclude: ['**/*.mp4'],
}
```

---

## Summary of V2 Changes

| # | Change | Complexity | Files Affected |
|---|--------|-----------|----------------|
| 1 | UI/UX Polish — scroll navbar, Ken Burns hero, hover cards, toast, micro-interactions | Medium | `Navbar.jsx`, `HeroSection.jsx`, `MovieCard.jsx`, `ReviewCard.jsx`, `App.jsx` |
| 2 | Full Netflix-style video player with controls, auto-hide, keyboard shortcuts | High | `VideoModal.jsx` (full rewrite) |
| 3 | Circular looping content rows with slide animation and position dots | Medium | `ContentRow.jsx` (full rewrite) |
| 4 | `src/media/` folder + `mediaConfig.js` single config for all images/video | Low | New folder + `mediaConfig.js`, update all components to import from it |

---

## Implementation Order (Recommended)

1. **Change 4 first** — set up the media folder structure before anything else so all images are properly referenced
2. **Change 3** — rewrite content rows (self-contained component)
3. **Change 2** — rewrite VideoModal (self-contained component)
4. **Change 1** — layer on UI polish last, across all components

---

*Samyaflix v2.0 — Change Requests*

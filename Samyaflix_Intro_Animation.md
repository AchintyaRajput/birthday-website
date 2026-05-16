add this# Samyaflix — Change Request: Netflix Intro Animation
> Single focused change. Implement this BEFORE the profile selection page renders.

---

## What It Should Do

When the user opens the website, instead of going straight to the profile page, they first see the **iconic Netflix intro animation** — the red "N" starts small in the center, dramatically zooms toward the viewer with a red cinematic glow/swoosh, then fades into the profile selection screen.

Reference: The real Netflix app intro — black screen, red N zooms in fast with a light streak effect, then cuts/fades to the next screen.

**Total duration: ~2.5 seconds, then auto-transitions to profile selection.**

---

## Implementation

### Step 1 — Create `NetflixIntro.jsx` Component

Create a new file: `src/components/NetflixIntro.jsx`

```jsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NetflixIntro = ({ onComplete }) => {
  // Auto-advance to profile page after animation finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2600) // 2.6 seconds total
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.1 }} // fade out at the end
    >
      {/* Red cinematic glow behind the N */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.6) 0%, rgba(229,9,20,0.2) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 8], opacity: [0, 1, 0] }}
        transition={{ duration: 2, ease: [0.2, 0, 0.8, 1], delay: 0.3 }}
      />

      {/* The N — zooms toward viewer */}
      <motion.div
        initial={{ scale: 0.08, opacity: 0 }}
        animate={{
          scale: [0.08, 0.15, 1, 8],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.2,
          ease: [0.12, 0, 0.39, 0],
          times: [0, 0.15, 0.7, 1],
        }}
        className="relative z-10 select-none"
      >
        {/* The iconic N — match Netflix's exact letterform with SVG */}
        <svg
          viewBox="0 0 111 190"
          className="w-24 h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 L0 190 L30 190 L30 0 Z"
            fill="#E50914"
          />
          <path
            d="M0 0 L81 190 L111 190 L30 0 Z"
            fill="#E50914"
          />
          <path
            d="M81 0 L81 190 L111 190 L111 0 Z"
            fill="#E50914"
          />
        </svg>

        {/* Light streak / swoosh effect over the N */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '200%', opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, delay: 1.0, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Optional: "tudum" sound can be added here via Audio API */}
      {/* 
        useEffect(() => {
          const audio = new Audio('/tudum.mp3') // drop tudum.mp3 in /public
          audio.volume = 0.4
          audio.play().catch(() => {}) // catch if browser blocks autoplay
        }, [])
      */}
    </motion.div>
  )
}

export default NetflixIntro
```

---

### Step 2 — Add `intro` State to `App.jsx`

In `App.jsx`, add a new state to control whether the intro is showing:

```jsx
// Add this state at the top of App.jsx
const [showIntro, setShowIntro] = useState(true) // true = show intro first
const [currentView, setCurrentView] = useState('profile')
const [isModalOpen, setIsModalOpen] = useState(false)
```

---

### Step 3 — Render the Intro with `AnimatePresence` in `App.jsx`

Wrap everything in `AnimatePresence` so the intro fades out smoothly into the profile page:

```jsx
import NetflixIntro from './components/NetflixIntro'
import { AnimatePresence, motion } from 'framer-motion'

return (
  <div className="bg-black min-h-screen">
    <AnimatePresence mode="wait">

      {/* INTRO — shows first, then disappears */}
      {showIntro && (
        <NetflixIntro
          key="intro"
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* MAIN APP — fades in after intro */}
      {!showIntro && (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Your existing view switcher here */}
          {currentView === 'profile' && <ProfileSelection onSelect={() => setCurrentView('home')} />}
          {currentView === 'home' && (
            <>
              <Navbar currentView={currentView} setCurrentView={setCurrentView} />
              <HomeDashboard onPlay={() => setIsModalOpen(true)} />
            </>
          )}
          {currentView === 'compliments' && (
            <>
              <Navbar currentView={currentView} setCurrentView={setCurrentView} />
              <ComplimentsPage />
            </>
          )}
          <AnimatePresence>
            {isModalOpen && <VideoModal onClose={() => setIsModalOpen(false)} />}
          </AnimatePresence>
        </motion.div>
      )}

    </AnimatePresence>
  </div>
)
```

---

### Step 4 — Animation Breakdown (Timeline)

| Time | What Happens |
|------|-------------|
| `0.0s` | Black screen. Nothing visible. |
| `0.3s` | Red glow starts blooming behind where the N will appear |
| `0.4s` | N appears tiny (8% of full size), opacity fades in |
| `0.4s–1.4s` | N zooms toward viewer — scale 0.08 → 1.0, feeling like it's coming AT you |
| `1.0s` | White light streak sweeps across the N (the cinematic swoosh) |
| `1.4s–2.0s` | N continues zooming, now overshooting to scale 8 (fills the screen) |
| `2.0s–2.2s` | N and glow fade to black as it overfills the screen |
| `2.1s` | Outer wrapper begins fading out (opacity 1 → 0, 0.5s) |
| `2.6s` | `onComplete()` fires — profile selection page renders and fades in |

---

### Step 5 — Optional: Add the "Tudum" Sound

The real Netflix intro has an iconic sound. To add it:

1. Find or download a `tudum.mp3` file (the Netflix sound — royalty-free versions exist online)
2. Drop it in your `public/` folder: `public/tudum.mp3`
3. Uncomment the audio block in `NetflixIntro.jsx` (shown in the comment above)

**Note:** Browsers may block autoplay audio without user interaction. The `.catch(() => {})` handles this gracefully — the animation plays silently if audio is blocked. This is fine.

---

### Step 6 — Skip Intro Option (Optional but Recommended)

Allow users to click/tap anywhere to skip the intro:

```jsx
// In NetflixIntro.jsx, add onClick to the wrapper div:
<motion.div
  className="fixed inset-0 bg-black flex items-center justify-center z-[9999] cursor-pointer"
  onClick={onComplete} // clicking anywhere skips the intro
  ...
>
```

Add a subtle hint text that fades in after 0.5s:
```jsx
<motion.p
  className="absolute bottom-12 text-zinc-600 text-sm"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
>
  Click anywhere to skip
</motion.p>
```

---

## File Summary

| Action | File |
|--------|------|
| **Create** | `src/components/NetflixIntro.jsx` |
| **Edit** | `src/App.jsx` — add `showIntro` state + render `<NetflixIntro>` |
| **Optional** | Drop `tudum.mp3` into `/public/` folder |

---

## What NOT to Do
- Do NOT use a CSS `animation-delay` hack on the existing N logo — build this as a proper separate component
- Do NOT make it longer than 3 seconds — it should feel snappy and cinematic, not slow
- Do NOT show the navbar or any other UI during the intro screen

---

*Samyaflix — Netflix Intro Animation Change Request*

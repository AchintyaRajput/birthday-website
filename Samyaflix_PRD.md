# Samyaflix
## Product Requirements Document
### Netflix-Themed Interactive Birthday Experience
**Subject:** Samya &nbsp;|&nbsp; **Version:** 1.0 &nbsp;|&nbsp; **Status:** Ready for Dev &nbsp;|&nbsp; **Date:** May 2026

---

## 1. Executive Summary

Samyaflix is a single-page web application (SPA) built to celebrate a friend's birthday in a cinematic, immersive, and deeply personal way. The product is a Netflix-clone experience — not a real streaming service, but a lovingly crafted digital gift that mimics the Netflix interface while being entirely filled with custom birthday content: memories, videos, compliments from friends, and personal notes.

The name **Samyaflix** captures the feeling the experience aims to create: weightless joy, the kind of happiness that lifts you off the ground. Every design decision, interaction, and piece of content is intentional — built to make Samya feel celebrated, seen, and loved.

This document specifies all product requirements, feature behaviour, UI/UX logic, content structure, and technical constraints needed to build Samyaflix from scratch.

---

## 2. Product Vision & Goals

### 2.1 Vision Statement

To create the most personal and emotionally resonant digital birthday gift possible — one that feels like it was made by a professional creative team, but speaks with the warmth of a best friend.

### 2.2 Primary Goals

- Make Samya feel genuinely celebrated on her birthday
- Create an experience beautiful enough to screenshot and share
- Surface memories, compliments, and personal messages in a cinematic format
- Deliver a polished, Netflix-quality UI that works flawlessly on desktop and mobile
- Be fast to load, smooth to navigate, and delightful to interact with

### 2.3 Non-Goals

- This is **NOT** a real streaming platform — no actual video streaming infrastructure required
- This is **NOT** a backend product — no user accounts, databases, or server-side logic
- This is **NOT** meant to scale beyond a single user (Samya) on her birthday

### 2.4 Success Criteria

| Metric | Target |
|--------|--------|
| Emotional impact | Samya cries (happy tears) or expresses genuine surprise |
| Performance | Page loads under 2 seconds on a standard connection |
| Mobile support | Fully functional on iOS Safari and Android Chrome |
| Animation quality | All transitions feel smooth at 60fps |
| Shareability | Samya shares it with at least one other person |

---

## 3. User Flow & Application Architecture

Samyaflix is a Single Page Application (SPA) with three distinct views managed entirely through React state — no URL routing required. The user moves through the experience linearly at first (Profile → Home), then freely between Home and Compliments via the navbar.

### 3.1 State Machine Overview

| State | View Rendered | Trigger to Enter |
|-------|--------------|------------------|
| `profile_selection` | Profile Selection Screen | Application initial load |
| `home_dashboard` | Home Dashboard + Navbar | Click Samya's profile card |
| `compliments` | Compliments Page + Navbar | Click "Compliments" in navbar |
| `modal_open` | Video Modal overlay | Click "Play" button on Home |

### 3.2 Full User Journey

1. User opens the website URL
2. Profile Selection screen fades in — pitch black background, centred layout
3. User sees "Who's watching?" and one profile card labelled "Samya"
4. User hovers over the card — scale-up and white border animation fires
5. User clicks the card — smooth transition to Home Dashboard
6. Navbar slides in from the top
7. Hero section renders with birthday title, synopsis, and video preview
8. User can scroll down to see memory card rows
9. User clicks "Play" — full-screen video modal opens
10. User presses Close (or Escape key) — modal closes, returns to Home
11. User clicks "Compliments" in navbar — view transitions to Compliments page
12. User scrolls through friend review cards
13. User clicks thumbs-up on a card — icon turns red (micro-interaction)

---

## 4. Detailed Feature Specifications

### 4.1 Global Navigation Bar

The navbar is visible on both the Home Dashboard and the Compliments view. It is **hidden entirely** on the Profile Selection screen. It must be sticky, always visible at the top of the viewport during scrolling.

#### Visual Design
- **Background:** CSS gradient from solid black (`#000000`) at the top to fully transparent at the bottom — height approximately 80px
- **Position:** Fixed, z-index above all other content
- **Left side:** A red "N" logo (or red `Gift` icon from Lucide) followed by text navigation links: "Home" and "Compliments"
- **Right side:** Search icon, Bell (notification) icon, and a small square avatar thumbnail
- **Active nav link** (current view) renders in bright white; inactive links in muted gray

#### Interactions
- Clicking "Home" sets view state to `home_dashboard`
- Clicking "Compliments" sets view state to `compliments`
- Avatar click has no required behaviour in v1 (decorative)
- On mobile: collapse nav links into a hamburger menu or slim icon row

#### Animation
- On initial entry, navbar slides down from `y: -60` to `y: 0` with a 0.5s ease-out via Framer Motion

---

### 4.2 View 1 — Profile Selection

This is the entry screen. It must feel authentically Netflix — clean, dark, cinematic. There is only one profile: Samya's.

#### Layout
- Full viewport, vertically and horizontally centred content
- Background: Pure black (`#000000`)
- Heading: "Who's watching?" in white, approximately 2rem, centred
- Below heading: A single profile card in a flex row

#### Profile Card
- A square (~160px × 160px) image with softly rounded corners (`border-radius: 8px`)
- Displays Samya's photo or a placeholder
- Below the image: the name "Samya" in muted gray (`#aaaaaa`), approximately 1rem

#### Hover State
- Image scales up by 8% (`transform: scale(1.08)`) smoothly
- A solid 3px white border appears around the image
- The name text brightens to pure white (`#ffffff`)
- Cursor changes to pointer

#### Click Interaction
- Clicking triggers a state change to `home_dashboard`
- A crossfade or slide transition (via `AnimatePresence`) moves to the Home view

---

### 4.3 View 2 — Home Dashboard

The main experience and emotional centrepiece of the product. Divided into two subsections: the Hero Section and the Content Rows.

#### 4.3.1 Hero Section

Full-width, approximately **85vh** tall. This is the "featured content" area, like Netflix's featured movie banner.

- Background: A dark gradient or cinematic image with a dark vignette overlay on top
- Layout: Flexbox row — text content on the left (~55% width), video/media on the right (~45% width)
- The right media column fades out on its left edge into black using a CSS `mask-image` gradient

##### Hero Text Content (Left Column)

| Element | Spec |
|---------|------|
| Subtitle tag | Small bold label — `"✨ A Netflix Original Birthday"` in muted text |
| Main Title | `"Happy Birthday Samya"` — large, bold, white, ~3rem–4rem |
| Synopsis | Warm personal birthday message, 2–4 sentences, muted white |
| Metadata row | Decorative tags like `"2004 • Heartwarming • Unforgettable"` |

##### Hero Buttons

**Play Button**
- Solid white background, black text, black `Play` icon (Lucide)
- On click: opens video modal (`modal_open` state)
- Rounded (pill or subtle radius)

**More Info Button**
- Semi-transparent dark gray background (`rgba(109,109,110,0.7)`), white text, white `Info` icon (Lucide)
- On click: scroll to content rows or show toast (v1)

##### Hero Media (Right Column)
- Auto-playing, muted, looping `<video>` element OR animated birthday placeholder
- Video must autoplay silently on page load — no user interaction required
- Left edge fades to black via `mask-image` CSS gradient
- On mobile: video column collapses, hero becomes single-column with centred text

---

#### 4.3.2 Content Rows (Scrollable Sliders)

Below the hero, 3–4 horizontally scrollable rows of image cards mimicking Netflix's content rows.

**Row Titles:**
- Sweet Memories
- Drama
- The Comedy Era
- Unforgettable Moments

**Row Behaviour:**
- Scrolls horizontally; default browser scrollbar hidden (`scrollbar-width: none`), but drag/swipe must work
- Cards are vertical rectangles (~160px × 240px) with rounded corners
- Cards display a photo with a dark gradient at the bottom for text legibility
- Card title appears at the bottom (white text, small, bold)

**Card Hover State:**
- Scales up to `1.08x`
- Subtle white border appears
- Centred Play icon overlay appears (white circle with play arrow)
- Adjacent cards slightly dim (optional)

---

### 4.4 View 3 — Compliments Page

A dedicated view accessible from the navbar. Displays messages from Samya's friends styled as Netflix review cards.

#### Page Header
- Title: `"Compliments & Wishes"` — large white text, left-aligned below navbar
- Subtitle: `"What the critics are saying about Samya"` — muted gray italic
- A subtle horizontal divider line below the subtitle

#### Card Grid Layout
- Responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Staggered entrance animations (Framer Motion, `0.08s` delay increments per card)

#### Review Card Anatomy

| Element | Spec |
|---------|------|
| Background | Dark gray `#18181b` (zinc-900), `border-radius: 12px` |
| Star Rating | 5 filled `Star` icons from Lucide React, coloured `#E50914` |
| Friend Name | Bold white text — acts as the "Critic Name" |
| Compliment Text | Light gray (`#aaaaaa`) body text — acts as the "Review" |
| Thumbs Up Button | Lucide `ThumbsUp` icon, bottom right. Default: gray. On hover/click: Netflix red |
| Card Border | `1px solid #2d2d2d` by default; brightens on hover |

#### Content Requirements
- Minimum 6 compliment cards
- Each card needs: friend name, compliment text (2–5 sentences), star count (all 5 in v1)
- Content must be personalised and specific to Samya

---

### 4.5 Video Modal

A full-screen overlay triggered by clicking the Play button on the Home Dashboard hero.

#### Trigger
- Clicking the white "Play" button on the hero section
- State changes to `modal_open`

#### Visual Design
- Background: Pitch black (`#000000`), `100vw × 100vh`
- Z-index: Above all other content
- A large video player centred in the modal (`max-width: 900px`, 16:9 aspect ratio)
- Video autoplays when the modal opens

#### Close Behaviour
- "Close" button in the top-left corner with `ChevronLeft` or `X` icon (Lucide)
- Pressing the `Escape` key also closes the modal
- On close: modal fades out, returns to `home_dashboard`

#### Animation
- **Enter:** Fade in (`opacity: 0 → 1`) + slight scale-up (`0.95 → 1`)
- **Exit:** Fade out (`opacity: 1 → 0`)

---

## 5. Technical Specifications

### 5.1 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| UI Framework | React (functional components + hooks) | Component model ideal for SPA state management |
| Styling | Tailwind CSS | Utility-first, fast, no CSS file bloat |
| Animation | Framer Motion | Production-grade, `AnimatePresence` for view transitions |
| Icons | Lucide React | Clean, consistent icon set |
| Build Tool | Vite (recommended) | Fast dev server, optimised production build |
| Deployment | Netlify / Vercel (static) | One-command deploy, free tier, global CDN |

### 5.2 File & Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProfileCard.jsx
│   ├── HeroSection.jsx
│   ├── MovieCard.jsx
│   ├── ContentRow.jsx
│   ├── ReviewCard.jsx
│   └── VideoModal.jsx
├── views/
│   ├── ProfileSelection.jsx
│   ├── HomeDashboard.jsx
│   └── ComplimentsPage.jsx
├── data/
│   ├── compliments.js
│   └── memoryCards.js
├── assets/
│   ├── images/
│   └── videos/
├── App.jsx
└── index.css
```

### 5.3 State Management

All state is managed at `App.jsx` level using React's `useState`. No external state library needed.

```js
// Three key state variables
const [currentView, setCurrentView] = useState('profile')
// 'profile' | 'home' | 'compliments'

const [isModalOpen, setIsModalOpen] = useState(false)
// Controls video modal overlay

const [likedCards, setLikedCards] = useState(new Set())
// Tracks thumbs-up'd compliment cards (local only)
```

### 5.4 Performance Requirements

| Requirement | Target |
|-------------|--------|
| Initial page load (LCP) | Under 2.5 seconds on fast 3G |
| Animation frame rate | 60fps on modern devices |
| Image optimisation | All images compressed, WebP format preferred |
| Video autoplay | Muted, compressed, under 5MB for hero preview |
| Bundle size | Under 500KB gzipped (excluding media assets) |

### 5.5 Browser & Device Support

- **Desktop:** Chrome 100+, Firefox 100+, Safari 15+, Edge 100+
- **Mobile:** iOS Safari 15+, Android Chrome 100+
- **Minimum viewport:** 375px wide (iPhone SE)
- Touch events supported for horizontal scroll rows (swipe gesture)

---

## 6. Design System

### 6.1 Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-red` | `#E50914` | Netflix Red — CTAs, stars, accents, logo, hover states |
| `--color-black` | `#000000` | Primary background, modal background |
| `--color-card` | `#18181b` | Card backgrounds (zinc-900) |
| `--color-surface` | `#141414` | Page surface / slight elevation |
| `--color-border` | `#2d2d2d` | Subtle borders and dividers |
| `--color-text-primary` | `#ffffff` | Primary text, headings, labels |
| `--color-text-secondary` | `#aaaaaa` | Body text, subtitles, muted labels |
| `--color-text-muted` | `#666666` | Placeholder text, inactive nav links |

### 6.2 Typography

| Role | Font | Size / Weight |
|------|------|---------------|
| Display title (Hero) | System bold / Helvetica Neue | 3rem–4rem, weight 800 |
| Page headings | System bold | 1.8rem–2rem, weight 700 |
| Section headings | System bold | 1.2rem–1.4rem, weight 600 |
| Body text | System regular | 0.95rem–1rem, weight 400 |
| Muted labels | System regular | 0.8rem–0.85rem, weight 400 |
| Navbar links | System medium | 0.9rem, weight 500 |

### 6.3 Spacing & Sizing

- Base spacing unit: 4px (Tailwind default)
- Card dimensions: 160px × 240px (portrait 2:3 ratio)
- Hero height: 85vh
- Navbar height: 68px
- Content row padding: `px-12` on desktop, `px-4` on mobile
- Card grid gap: 8px–12px

### 6.4 Motion & Animation Spec

| Interaction | Animation | Duration / Easing |
|-------------|-----------|-------------------|
| Profile → Home transition | Crossfade via `AnimatePresence` | 0.5s ease-in-out |
| Navbar entry | Slide from `y:-60` to `y:0` + fade in | 0.5s ease-out |
| Profile card hover | `scale(1.08)` + border fade in | 0.2s ease |
| Movie card hover | `scale(1.08)` + overlay fade | 0.25s ease |
| Review card entrance | Staggered fade + slide up 20px | 0.4s, 0.08s delay increments |
| Modal open | Fade in + scale `0.95 → 1` | 0.3s ease-out |
| Modal close | Fade out | 0.2s ease-in |
| Thumbs-up click | Color change to red + scale pulse | 0.15s ease |
| View transitions | `AnimatePresence` with opacity + x slide | 0.4s ease-in-out |

---

## 7. Content Requirements

Samyaflix's emotional impact depends entirely on the quality and personalisation of its content. Generic placeholder content is not acceptable for the final product.

### 7.1 Required Content Assets

| Asset | Format | Notes |
|-------|--------|-------|
| Samya's profile photo | JPG/PNG, square crop preferred | Used on Profile Selection card and navbar avatar |
| Hero video or animated element | MP4, muted, looping, under 5MB | Birthday-themed, personal footage preferred |
| Memory card photos (12–20) | JPG/PNG, portrait orientation preferred | Grouped into 3–4 thematic rows |
| Compliment texts (6–10) | Plain text | From real friends, personalised to Samya |
| Friend names (for compliments) | Plain text | As each friend wants to be credited |
| Personal birthday note | Plain text (3–5 sentences) | Displayed as hero "synopsis" |

### 7.2 Content Row Themes (Suggested)

| Row Title | Content Type |
|-----------|-------------|
| Sweet Memories | Candid, everyday friendship moments |
| Drama | Funny, exaggerated, inside-joke content |
| The Comedy Era | Genuinely silly / hilarious photos |
| Unforgettable Moments | Milestone or travel memories |

### 7.3 Compliment Card Copy Guidelines

- Each compliment must be **specific to Samya** — mention real traits, memories, or inside references
- Length: 2–4 sentences per card (not too short to feel lazy, not too long to read)
- Tone: Warm and genuine, can be funny, should feel like the person who wrote it
- Star rating: All 5 stars in v1 (unanimous 10/10 from everyone)

---

## 8. Scope, Risks & Open Questions

### 8.1 In Scope (v1)

- [x] All three views: Profile Selection, Home Dashboard, Compliments
- [x] Global navbar with view-switching
- [x] Hero section with Play / More Info buttons
- [x] Horizontal scrollable content rows with hover effects
- [x] Video modal with close behaviour and Escape key support
- [x] Compliment review cards with thumbs-up micro-interaction
- [x] Staggered card animations via Framer Motion
- [x] Full mobile responsiveness
- [x] Static deployment (no backend)

### 8.2 Out of Scope (v1)

- [ ] Real video streaming or media hosting infrastructure
- [ ] User authentication or accounts
- [ ] Admin panel to add / edit compliments
- [ ] Social sharing features
- [ ] Analytics or tracking
- [ ] Multiple profile cards
- [ ] Sound effects or background music

### 8.3 Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Video autoplay blocked by browser | Medium | Always use `muted` attribute — autoplay works when muted |
| Media assets too large → slow load | High | Compress all images to WebP; cap video at 5MB |
| Mobile horizontal scroll feels clunky | Medium | Use `overscroll-behavior` and `touch-action` CSS; test on real devices |
| Framer Motion bundle size impact | Low | Tree-shaking; Framer Motion adds ~40KB gzipped — acceptable |
| Samya sees it before her birthday | Medium | Keep URL private; optionally add a password gate |

### 8.4 Open Questions

1. Will real photos be provided, or should placeholder images be used in development?
2. Will a real birthday video be provided for the modal and hero preview?
3. Who is collecting and writing the compliments — one person or each friend individually?
4. Should the site have a secret "password gate" before the Profile Selection screen?
5. Should the "More Info" button trigger any functional behaviour in v1?
6. Is there a specific deployment deadline (the morning of the birthday)?

---

## 9. Launch Checklist

Before sending the URL to Samya, verify every item:

### 9.1 Development
- [ ] All three views render correctly and transitions are smooth
- [ ] Video modal opens and closes (including Escape key)
- [ ] Navbar view-switching works correctly
- [ ] All hover states fire on desktop
- [ ] All card rows scroll horizontally without showing scrollbar
- [ ] Thumbs-up micro-interaction works on all compliment cards
- [ ] No console errors in browser dev tools

### 9.2 Content
- [ ] Samya's real photo is on the profile card and navbar avatar
- [ ] Personal birthday note is in the hero synopsis
- [ ] All memory photos are loaded and correctly categorised into rows
- [ ] All compliments are written by real friends with real names
- [ ] Hero video or animated element is present and auto-playing

### 9.3 Performance & QA
- [ ] Site loads under 3 seconds on a mobile connection
- [ ] Layout is not broken on iPhone SE (375px) viewport
- [ ] Tested on Safari (most likely browser for iOS users)
- [ ] No images are stretching or cropping incorrectly
- [ ] Deployed to production URL (not localhost)

---

*Samyaflix — Built with love ❤️*

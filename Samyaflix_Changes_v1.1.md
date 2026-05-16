# Samyaflix — Change Requests v1.1
> These are the exact changes to be made to the current build. Apply all 5 in order.

---

## Change 1 — Profile Avatar (Top Right) → Navigates Back to Profile Selection

**Location:** `Navbar.jsx` (top-right avatar/profile icon)

**What to change:**
- The small square profile avatar in the top-right corner of the navbar should be a clickable button
- On click → set `currentView` state back to `'profile'`
- This mimics the real Netflix behaviour where clicking your avatar lets you switch profiles

**Code hint:**
```jsx
// In Navbar.jsx, make the avatar clickable
<img
  src={samyaPhoto}
  onClick={() => setCurrentView('profile')}
  className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-white transition"
/>
```

**Notes:**
- The `setCurrentView` prop must be passed down to `Navbar.jsx` from `App.jsx`
- On navigating back to profile selection, the navbar should disappear (it's hidden on the profile view)

---

## Change 2 — Fix Layout: Images & Text Off-Centered, Gap on Right Side

**Location:** `HomeDashboard.jsx` → Hero Section + overall page layout

**What to change:**

### 2a — Hero Section Layout Fix
- Hero content must be `w-full` with NO right margin/padding causing a gap
- Use `px-12` on desktop and `px-4` on mobile — applied consistently on BOTH sides
- The hero flex row should be `w-full` not a fixed or max-width container that leaves a gap on the right
- Ensure the video/media column on the right bleeds to the **edge** of the viewport

```jsx
// Hero wrapper — should be full width
<div className="relative w-full min-h-[85vh] flex items-center px-12">
  {/* Left: text content */}
  <div className="flex-1 ...">...</div>
  {/* Right: video preview — goes to edge */}
  <div className="w-[45%] ...">...</div>
</div>
```

### 2b — Content Rows Layout Fix
- Each content row wrapper must be `w-full` with consistent `px-12` horizontal padding
- Card sizes should be at minimum `w-40 h-60` (160px × 240px) — not shrinking smaller
- Row title font size should be at least `text-xl font-bold` — not small or muted
- The scrollable row should use `flex flex-nowrap gap-3` inside `overflow-x-auto`

### 2c — Global Page Width Fix
- Remove any `max-w-*` container that is limiting the page width and causing right-side gaps
- The root page wrapper should be `min-h-screen w-full bg-black overflow-x-hidden`

---

## Change 3 — Fix Compliments Page Layout

**Location:** `ComplimentsPage.jsx` + `ReviewCard.jsx`

**What to change:**

### 3a — Grid Layout
- Replace any broken layout with a clean CSS grid:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 py-8">
  {compliments.map((c, i) => <ReviewCard key={c.id} data={c} index={i} />)}
</div>
```

### 3b — Review Card Fix
- Each card must have a fixed structure — nothing should overflow or misalign:
```jsx
<div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 flex flex-col gap-3">
  {/* Stars */}
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#E50914" color="#E50914" />)}
  </div>
  {/* Friend name */}
  <p className="text-white font-bold text-base">{data.name}</p>
  {/* Compliment text */}
  <p className="text-zinc-400 text-sm leading-relaxed flex-1">{data.text}</p>
  {/* Thumbs up */}
  <div className="flex justify-end">
    <button onClick={handleLike} className="text-zinc-500 hover:text-red-600 transition">
      <ThumbsUp size={18} />
    </button>
  </div>
</div>
```

### 3c — Page Header Fix
- Title and subtitle must be left-aligned under the navbar with proper top padding:
```jsx
<div className="pt-28 pb-6 px-12 border-b border-zinc-800">
  <h1 className="text-3xl font-bold text-white">Compliments & Wishes</h1>
  <p className="text-zinc-400 italic mt-1">What the critics are saying about Samya</p>
</div>
```

### 3d — Staggered Animation Fix
- Wrap each card in Framer Motion with staggered delay:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.08, duration: 0.4 }}
>
  <ReviewCard ... />
</motion.div>
```

---

## Change 4 — Profile Selection Page: Make It More Like Netflix

**Location:** `ProfileSelection.jsx`

**What to change:**

### 4a — Add Dummy Profiles alongside Samya
Add 3–4 dummy profiles to make the screen feel like real Netflix. Samya's is the only real/clickable one.

```jsx
const profiles = [
  { id: 1, name: "Samya", photo: samyaPhoto, real: true },
  { id: 2, name: "Best Friend", color: "#E50914", emoji: "🎉", real: false },
  { id: 3, name: "The Gang", color: "#2563EB", emoji: "🎂", real: false },
  { id: 4, name: "Add Profile", isAdd: true, real: false },
]
```

### 4b — Dummy Profile Card Design
- Dummy profiles should show a solid coloured square (like Netflix's default avatars) with an emoji or icon centred inside
- Only Samya's card triggers navigation to `home_dashboard`
- Dummy cards can show a subtle "Coming Soon" tooltip or just do nothing on click

### 4c — Add "Manage Profiles" Button
- Add a bordered ghost button at the bottom that reads "Manage Profiles" (non-functional, decorative)
```jsx
<button className="mt-10 px-6 py-2 border border-zinc-500 text-zinc-400 text-sm rounded hover:border-white hover:text-white transition">
  Manage Profiles
</button>
```

### 4d — Layout Polish
- Profiles should be in a single `flex row` centred horizontally
- "Who's watching?" heading should be `text-4xl font-bold text-white text-center`
- Each profile card: `160px × 160px` image/colour block, `rounded-md`, name below in `text-zinc-400 text-sm text-center mt-2`
- On hover: `scale(1.08)`, solid white `ring-2 ring-white`, name turns white
- Transition: `transition-all duration-200`

---

## Change 5 — Rename App: Remove "Antigravity", Use "Samyaflix" Everywhere

**What to change across all files:**

### 5a — App Title (Browser Tab)
In `index.html`:
```html
<title>Samyaflix</title>
```

### 5b — Navbar Logo Text
In `Navbar.jsx`, replace the logo text or icon label:
```jsx
// Replace "N" logo or "Antigravity" text with:
<span className="text-red-600 font-black text-2xl tracking-tight">SAMYAFLIX</span>
```

### 5c — Any Headings or Text on Page
- Search for the string `"Antigravity"` across all `.jsx` and `.js` files
- Replace every instance with `"Samyaflix"`
- Check: hero section, page titles, meta tags, comments, README

### 5d — Meta Tags in `index.html`
```html
<meta name="description" content="Samyaflix — A Netflix birthday experience made just for Samya" />
<meta property="og:title" content="Samyaflix 🎂" />
```

### 5e — README / PRD References
- Update `Antigravity_PRD.md` title to `Samyaflix — Product Requirements Document`
- Update any references in comments or docs

---

## Summary of All Changes

| # | Change | File(s) Affected |
|---|--------|-----------------|
| 1 | Profile avatar click → back to profile selection | `Navbar.jsx`, `App.jsx` |
| 2 | Fix off-centered layout & right-side gap | `HomeDashboard.jsx`, global layout wrapper |
| 3 | Fix Compliments page alignment & card layout | `ComplimentsPage.jsx`, `ReviewCard.jsx` |
| 4 | Profile Selection → Netflix-style with dummy profiles | `ProfileSelection.jsx` |
| 5 | Rename everywhere from Antigravity → Samyaflix | `index.html`, `Navbar.jsx`, all `.jsx` files |

---

*Samyaflix v1.1 — Change Requests*

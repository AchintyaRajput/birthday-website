// src/media/mediaConfig.js
// ─────────────────────────────────────────────
// SAMYAFLIX MEDIA CONFIG
// To change any image or video, just update the
// import path below. That's it.
// ─────────────────────────────────────────────

// ── PROFILE ──────────────────────────────────
import samyaPhoto from './images/profile/samya.png'

// ── HERO ─────────────────────────────────────
import heroBg from './images/hero/hero-bg.png'

// ── VIDEO ────────────────────────────────────
// import birthdayReel from './videos/birthday-reel.mp4'
const birthdayReel = 'https://assets.mixkit.co/videos/preview/mixkit-girl-blowing-out-birthday-candles-on-a-cake-4328-large.mp4' // Temporary placeholder

// ── SWEET MEMORIES ROW ───────────────────────
import cafeDays from './images/sweet-memories/cafe-days.png'
import squadGoals from './images/sweet-memories/squad-goals.png'
import iceCreamDates from './images/sweet-memories/ice-cream-dates.png'
import goldenHour from './images/sweet-memories/golden-hour.png'
import justUs from './images/sweet-memories/just-us.png'
import foreverVibes from './images/sweet-memories/forever-vibes.png'

// ── DRAMA ROW ────────────────────────────────
import emotional from './images/drama/emotional.png'
import overDramatic from './images/drama/over-dramatic.png'
import theArgument from './images/drama/the-argument.png'
import plotTwist from './images/drama/plot-twist.png'
import cryingLaughing from './images/drama/crying-laughing.png'
import mainCharacter from './images/drama/main-character.png'

// ── COMEDY ROW ───────────────────────────────
import chaoticEnergy from './images/comedy/chaotic-energy.png'
import cursedPhoto from './images/comedy/cursed-photo.png'
import theFace from './images/comedy/the-face.png'
import sendHelp from './images/comedy/send-help.png'
import noContext from './images/comedy/no-context.png'
import unhinged from './images/comedy/unhinged.png'

// ── UNFORGETTABLE MOMENTS ROW ─────────────────
import milestone1 from './images/moments/milestone-1.png'
import milestone2 from './images/moments/milestone-2.png'
import milestone3 from './images/moments/milestone-3.png'
import milestone4 from './images/moments/milestone-4.png'
import milestone5 from './images/moments/milestone-5.png'
import milestone6 from './images/moments/milestone-6.png'

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

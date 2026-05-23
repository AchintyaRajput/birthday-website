// src/media/mediaConfig.js
// ─────────────────────────────────────────────
// SAMYAFLIX MEDIA CONFIG
// To change any image or video, just update the
// import path below. That's it.
// ─────────────────────────────────────────────

// ── PROFILE ──────────────────────────────────
import samyaPhoto from '../../samya/s7.jpeg'

// ── HERO ─────────────────────────────────────
import heroBg from '../../samya/herobg.jpeg'

// ── VIDEO ────────────────────────────────────
import birthdayReel from '../../samya/vid2.mp4'

// ── SWEET MEMORIES ROW ───────────────────────
import cafeDays from '../../samya/s16.jpeg'
import squadGoals from '../../samya/s3.jpeg'
import iceCreamDates from '../../samya/s9.jpeg'
import goldenHour from '../../samya/s10.jpeg'
import justUs from '../../samya/s5.jpeg'
import foreverVibes from '../../samya/s11.jpeg'

// ── DRAMA ROW ────────────────────────────────
import emotional from '../../samya/s15.jpeg'
import overDramatic from '../../samya/s6.jpeg'
import theArgument from '../../samya/s12.jpeg'
import plotTwist from '../../samya/s18.jpeg'
import cryingLaughing from '../../samya/s19.jpeg'
import mainCharacter from '../../samya/s20.jpeg'

// ── COMEDY ROW ───────────────────────────────
import chaoticEnergy from '../../samya/s4.jpeg'
import cursedPhoto from '../../samya/s8.jpeg'
import theFace from '../../samya/s13.jpeg'
import sendHelp from '../../samya/s17.jpeg'
import noContext from '../../samya/s2.jpeg'
import unhinged from '../../samya/s14.jpeg'


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
      { id: 1,src: cafeDays },
      { id: 2,src: squadGoals },
      { id: 3,src: iceCreamDates },
      { id: 4,src: goldenHour },
      { id: 5,src: justUs },
      { id: 6,src: foreverVibes },
    ],
    drama: [
      { id: 1,src: emotional },
      { id: 2,src: overDramatic },
      { id: 3,src: theArgument },
      { id: 4,src: plotTwist },
      { id: 5,src: cryingLaughing },
      { id: 6,src: mainCharacter },
    ],
    comedy: [
      { id: 1,src: chaoticEnergy },
      { id: 2,src: cursedPhoto },
      { id: 3,src: theFace },
      { id: 4,src: sendHelp },
      { id: 5,src: noContext },
      { id: 6,src: unhinged },
    ],
  },
}

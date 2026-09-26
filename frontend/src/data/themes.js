/**
 * Banner Theme Registry
 *
 * Each banner GIF/photo maps to an accent theme. The Hero picks one at
 * random per visit (rotation mode A) and applies its CSS channel variables,
 * which recolor every lilac/navy Tailwind class and CSS rule site-wide.
 * Backgrounds and text colors are never touched.
 *
 * To add a new banner: drop the file in src/assets/banners/, import it
 * below, and append one entry. Nothing else needs to change.
 */

import purpleBg from '../assets/portfolio background 2.gif';
import sunsetBg from '../assets/banners/sunset.gif';
import bemidjiBg from '../assets/banners/bemidji.gif';
import kirokazeBg from '../assets/banners/kirokaze.gif';
// import spidermanBg from '../assets/banners/spiderman.jpeg'; // parked — re-enable on request

export const THEME_STORAGE_KEY = 'dhruv-portfolio-theme';

export const THEMES = [
  {
    id: 'nebula-purple',
    label: 'Nebula Purple',
    src: purpleBg,
    vars: { lilac: '139 124 248', navy: '17 8 82', navyMid: '29 14 130', glow: '17 8 82' },
    accentHex: '#8b7cf8',
    cal: ['rgba(255, 255, 255, 0.04)', '#39296e', '#5841a1', '#7859d9', '#8b7cf8'],
  },
  {
    id: 'sunset-rose',
    label: 'Sunset Rose',
    src: sunsetBg,
    vars: { lilac: '224 99 143', navy: '66 16 40', navyMid: '122 36 71', glow: '224 99 143' },
    accentHex: '#e0638f',
    cal: ['rgba(255, 255, 255, 0.04)', '#4a1c33', '#7a2c50', '#b44a76', '#e0638f'],
  },
  {
    id: 'ice-cyan',
    label: 'Ice Cyan',
    src: bemidjiBg,
    vars: { lilac: '57 178 250', navy: '11 47 77', navyMid: '16 78 126', glow: '57 178 250' },
    accentHex: '#39b2fa',
    cal: ['rgba(255, 255, 255, 0.04)', '#0c324e', '#155a86', '#2389c4', '#39b2fa'],
  },
  {
    id: 'kiro-teal',
    label: 'Kiro Teal',
    src: kirokazeBg,
    vars: { lilac: '95 201 181', navy: '12 47 42', navyMid: '20 82 74', glow: '95 201 181' },
    accentHex: '#5fc9b5',
    cal: ['rgba(255, 255, 255, 0.04)', '#0e3530', '#17574f', '#2f8a7d', '#5fc9b5'],
  },
  // PARKED — spidey-red theme (gif removed, uncomment to re-enable):
  // {
  //   id: 'spidey-red',
  //   label: 'Spidey Red',
  //   src: spidermanBg,
  //   vars: { lilac: '229 50 62', navy: '77 10 18', navyMid: '122 16 32', glow: '229 50 62' },
  //   accentHex: '#e5323e',
  //   cal: ['rgba(255, 255, 255, 0.04)', '#4d0a12', '#7a1020', '#b51f2c', '#e5323e'],
  // },
];

export function getTheme(id) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export function pickRandomTheme() {
  return THEMES[Math.floor(Math.random() * THEMES.length)];
}

/** Write a theme's channel variables onto <html>. No-op on the server. */
export function applyThemeVars(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement.style;
  root.setProperty('--lilac', theme.vars.lilac);
  root.setProperty('--navy', theme.vars.navy);
  root.setProperty('--navy-mid', theme.vars.navyMid);
  root.setProperty('--glow', theme.vars.glow);
  try {
    window.sessionStorage.setItem(THEME_STORAGE_KEY, theme.id);
  } catch {
    /* private mode — theme still applies for this visit */
  }
  // Keep the boot id fresh — widgets read it to stay in sync.
  try {
    window.__theme = theme.id;
  } catch {
    /* non-configurable edge — event detail below still carries the id */
  }
  // Let mounted widgets (e.g. GitHub heatmap) follow manual switches.
  try {
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme.id }));
  } catch {
    /* older browsers — vars above already applied */
  }
}

/** Theme id chosen by the pre-paint boot script (if it ran). */
export function getBootedThemeId() {
  if (typeof window === 'undefined') return null;
  return window.__theme ?? null;
}

# AGENT.md — Portfolio Restructure Spec
 
You are working on a personal portfolio site. This file is the standing
spec for a **structural** redesign. Keep it open and re-check against it
before finishing any section — don't rely on memory of earlier instructions
once the conversation/context gets long.
 
## Critical framing — read this first
Two screenshot sets were provided for context:
- **This site (current, and the visual target)**: a terminal/hacker-console
  aesthetic — black background with a dot-grid pattern, orange (#FF4500-ish)
  and white monospace/condensed-display type, a floating "SYSTEM CONTROLS"
  keyboard-shortcut panel, a live CPU%/TIME readout in the header, a
  terminal-window-style photo frame, a vertical icon dock on the left edge.
  **This look does not change.**
- **Reference site (structure only, NOT style)**: an editorial-card
  portfolio (bio + "find me online" link grid + CTA bar; a consolidated
  experience panel with date-range badges; a searchable/filterable project
  table with thumbnails and demo/GitHub icons; an open-source contribution
  list; a footer bar). Its white-card/city-illustration/grotesk-font look
  is explicitly **not** being adopted. Only the way it groups and presents
  information is the reference.
If in doubt at any point: **when structure and style conflict, structure
changes, style does not.** Never introduce a light background, white card
borders, a photo/illustration background, or a non-monospace/non-display
body font as part of this work.
 
## What stays exactly as-is (do not modify)
- Black background + dot-grid pattern
- Orange/white color system
- Monospace type for labels/meta/tags, bold condensed display font for
  headings
- "SYSTEM CONTROLS" HUD panel and its keyboard-shortcut list
- CPU%/TIME readout in the header
- Terminal-window-style photo frame (title bar + min/max/close dots)
- Left-edge vertical social icon dock
- "HOT RELOADING..." status line and similar terminal-flavor text, if kept
  elsewhere on the site
## Structural patterns to adopt (reorganize content only)
 
1. **Hero**
   - Keep existing headline, subhead, skill tags, photo, CTA buttons as-is
   - Add a "FIND ME ONLINE" block: a small grid/list of link rows (icon +
     label + one-line description + arrow), styled as terminal rows
     (monospace label, thin border, orange hover state) — not white cards.
     Pull from existing social/resume/profile links already on the site.
   - Add an "AVAILABLE FOR PROJECTS" strip: short pitch line + prominent
     email button (mailto:), styled consistent with existing CTA buttons
     (e.g. the orange EXPLORE PROJECTS / RESUME buttons)
2. **Experience**
   - Currently: separate floating cards per role with a timeline dot/line
   - Change to: **one continuous panel** containing all roles as internal
     rows, divided by thin lines (not separate boxes). Each row:
     - date-range badge (small bordered pill, e.g. `FEB 2026 – PRESENT`)
     - role title (bold)
     - company + location (muted)
     - description paragraph
     - tech-tag pills below (reuse existing tag-pill style already used on
       the site's project cards)
   - Keep the existing "INTERNSHIP" colored label badges if present
3. **Projects**
   - Currently: numbered rows (`00/`, `01/`...) with an expand chevron
   - Add above the list: a search input ("SEARCH THE ARCHIVE" or similar,
     styled as a terminal input) and a row of tech-filter pills (ALL + top
     technologies), all in the existing dark/orange style
   - Keep the numbered index style for each row if you like it (it's part
     of this site's identity) but add: a small thumbnail/screenshot per
     project if not already present, and explicit icon buttons for live
     demo (external-link), GitHub, and video/demo — not just a chevron
   - Keep the expandable "DETAILS" behavior already present
4. **Open Source**
   - Keep the existing contribution activity chart
   - For any listed contributions, structure each as a row: org/project
     name + one-line description + "VIEW CONTRIBUTION →" links, styled
     consistent with the rest of the site (not white cards)
5. **Footer**
   - Add a thin full-width footer bar: "DESIGNED & BUILT BY {NAME}" left,
     "© {YEAR}" right — dark background, orange accent line or border,
     monospace type
## Things to explicitly NOT do
- Do not add a fixed/parallax background illustration
- Do not switch card fills to black-with-white-border-on-light-background
- Do not switch the display font to a different grotesk family
- Do not remove the HUD panel, CPU/TIME clock, or dot-grid background
- Do not remove the numbered project index style unless the user later
  asks for that specifically
## Process rules for the agent
1. Inspect the existing codebase (framework, styling system, data source)
   before writing any code. State findings before proceeding.
2. Work section-by-section (hero → experience → projects → open source →
   footer), one commit per section, and summarize the diff after each.
3. Reuse existing design tokens/components (colors, tag-pill component,
   button styles, panel/border styles) rather than inventing new ones —
   this is a reorganization, not a new design system.
4. Don't introduce new dependencies unless something specific requires it
   (e.g. a search/filter needs simple client-side JS — no library needed
   for a small project list).
5. Keep accessibility: proper heading hierarchy, alt text on thumbnails,
   keyboard-focusable filter buttons/search input/links.
6. Test responsive behavior at mobile width — the consolidated experience
   panel and project search/filter row must not overflow horizontally; the
   HUD panel should collapse or hide on small screens if it already does.
7. When uncertain about a specific value (padding, exact badge shape),
   match whatever pattern already exists elsewhere on the site for
   consistency, and flag it as an assumption rather than blocking on it.
## Definition of done
- Site is visually indistinguishable in *style* from before (same colors,
  fonts, HUD panel, dot-grid, photo frame)
- Hero has a find-me-online link grid + availability CTA
- Experience is one consolidated panel of role rows
- Projects has search + filter + demo/GitHub icons + existing expand
  behavior
- Open Source contributions are structured as link rows
- A footer bar exists in the site's own style
- Site builds/runs with no console errors
- Lighthouse performance is unchanged (no new heavy assets introduced)
 

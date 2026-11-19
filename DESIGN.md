---
name: Hainam. Portfolio
description: Phạm Hải Nam's portfolio set as a well-travelled passport, with the data page, employer record pages, visa plates, a credentials certificate and a document-style application.
colors:
  burgundy: "#6B1F2D"
  burgundy-deep: "#4A1320"
  on-burgundy: "#ECD296"
  gold: "#A88434"
  stamp-red: "#B03A48"
  stamp-navy: "#1E2A56"
  stamp-green: "#2E6240"
  stamp-plum: "#7A3B5E"
  paper: "#F3EDE2"
  paper-raised: "#F9F5EE"
  rose: "#F2DFDD"
  sage: "#DFE9DC"
  mist: "#DDE3EE"
  ink: "#1B2340"
  ink-soft: "#4A4F63"
  rule: "#1B2340"
  guilloche-a: "#C47880"
  guilloche-b: "#78A080"
  hologram-peach: "#FFC896"
  hologram-mint: "#96DCC3"
  hologram-periwinkle: "#96B4F5"
  hologram-pink: "#F5AAC8"
  burgundy-dark: "#8C2A3B"
  burgundy-deep-dark: "#340D16"
  on-burgundy-dark: "#F2DEAC"
  gold-dark: "#D6B46A"
  stamp-red-dark: "#E67680"
  stamp-navy-dark: "#84B2D6"
  stamp-green-dark: "#80BA92"
  stamp-plum-dark: "#D08CB2"
  paper-dark: "#160C0F"
  paper-raised-dark: "#221318"
  rose-dark: "#321820"
  sage-dark: "#1E241F"
  mist-dark: "#1C1E2A"
  ink-dark: "#F0E6D5"
  ink-soft-dark: "#C0B1A2"
  rule-dark: "#E2C98A"
  guilloche-a-dark: "#D6B46A"
  guilloche-b-dark: "#8C2A3B"
typography:
  display:
    fontFamily: "Noto Serif Display, Georgia, serif"
    fontSize: "clamp(3.625rem, 8.3vw, 7.25rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Noto Serif Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Noto Serif Display, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.18
  greeting:
    fontFamily: "Noto Serif Display, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.6rem)"
    fontWeight: 500
    lineHeight: 1.25
  title:
    fontFamily: "Noto Serif Display, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.25
  title-lead:
    fontFamily: "Noto Serif Display, Georgia, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.25
  role:
    fontFamily: "Noto Serif Display, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.4
  figure:
    fontFamily: "Noto Serif Display, Georgia, serif"
    fontSize: "clamp(3.5rem, 7vw, 5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  metric:
    fontFamily: "Noto Serif Display, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  body:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.14em"
  label-rail:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.12em"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    letterSpacing: "0.06em"
    fontFeature: "tnum"
  data-period:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    letterSpacing: "0.06em"
    fontFeature: "tnum"
  data-compact:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "0.02em"
  button:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.16em"
  button-compact:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.14em"
rounded:
  tail: "2px"
  control: "3px"
  frame: "4px"
  bubble: "8px"
  document: "10px"
  full: "9999px"
spacing:
  gutter: "20px"
  gutter-md: "40px"
  rail: "96px"
  container: "1240px"
  card: "20px"
  card-sm: "24px"
  card-lg: "32px"
  record-column: "300px"
  heading-gap: "56px"
  section: "96px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.on-burgundy}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-primary-compact:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.on-burgundy}"
    typography: "{typography.button-compact}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.stamp-navy}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  input-document:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.control}"
    padding: "24px 16px 10px"
  card-data-page:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.ink}"
    rounded: "{rounded.document}"
    padding: "{spacing.card}"
  card-employer-page:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.document}"
    padding: "{spacing.card-lg}"
  card-certificate:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
    rounded: "{rounded.document}"
    padding: "{spacing.card-lg}"
  card-visa-rose:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.stamp-red}"
    rounded: "{rounded.document}"
  card-visa-sage:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.stamp-green}"
    rounded: "{rounded.document}"
  card-visa-mist:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.stamp-navy}"
    rounded: "{rounded.document}"
  nav-rail:
    backgroundColor: "{colors.burgundy}"
    textColor: "{colors.on-burgundy}"
    width: "{spacing.rail}"
  nav-rail-item:
    textColor: "{colors.on-burgundy}"
    typography: "{typography.label-rail}"
    rounded: "{rounded.frame}"
    padding: "12px 4px"
---

# Design System: Hainam. Portfolio

## Overview

**Creative North Star: "The Well-Travelled Passport"**

The site is a passport, and every surface answers to that object. Pages are security paper: warm ivory with fine rose and green interference waves drawn procedurally behind the content. The burgundy cover leather is the frame. It runs down the left edge as a rail on desktop, becomes a strip on top and tabs along the bottom on smaller screens, closes the page as the footer, and heads every form and dialog. Identity is a data page. Each employer is a record page carrying its own entry stamp, projects are visa plates, education is a certificate plate, and contact is an application form.

Light theme is the open book: pages lit, ink navy text, burgundy headings. Dark theme is the closed cover: burgundy-black leather ground, cream ink, gold-blocked headings and name, guilloché dimmed almost away. Both themes share one token set through CSS custom properties (`--paper`, `--ink`, and so on, stored as RGB channels so Tailwind can apply alpha), swapped by a `.dark` class.

Density is moderate and documentary: ruled field rows, tracked mono captions, generous section spacing. Ornament is real security-print vocabulary (guilloché, rosette, hologram seal, intaglio hatching, machine-readable zone), never generic decoration. The world deliberately replaces a dark gradient developer template: no gradient-filled name, no tilted avatar card, no logo marquee, no grid of identical cards.

**Key Characteristics:**
- Security-paper grounds (paper, laid paper, rose, sage, mist) with procedural guilloché wave fields behind content.
- Burgundy leather with a fine noise grain marks every cover element: rail, strips, footer, form and chat headers, floating button.
- Three typographic hands: engraved serif for names, headings and result figures, OCR-style mono for anything the document machine prints, plain sans for prose.
- Stamp inks (red, navy, green, plum) are signal colours, pressed with an ink-speckle filter and slight rotation.
- Data is shown as ruled label and value rows or dot-separated mono lines, never as chips or tag clouds.
- Motion is a single press: stamps land once and then stay still.

## Colors

A warm paper-and-leather palette: ivory and pastel security grounds, navy ink, burgundy cover, gold foil, and four stamp inks that only ever appear as marks or signals.

### Primary
- **Cover Burgundy** (burgundy; burgundy-dark in dark theme): The passport cover. Fills the leather rail, top strip, bottom tabs, footer, form and chat headers, the floating assistant button, the primary button, the chat send button and the user's chat bubbles. In light theme it is also the colour of section headings, the engraved name and the dash bullets. Also the text-selection colour, caret colour and scrollbar thumb (55%).
- **Cover Burgundy Deep** (burgundy-deep): The leather ground in dark theme, the primary button's border, and the tint of every drop shadow.

### Secondary
- **Pressed Gold** (gold; gold-dark): Foil stamping. The crest monogram on leather, the active-item hairline in the rail, the focus ring on every interactive element, the floating button's inner ring, and in dark theme the section headings, the engraved name, the dash bullets and the hover colour for contact links.
- **Gold Thread** (on-burgundy): Text and icons on leather. Never used on paper.

### Tertiary (stamp inks)
- **Entry Red** (stamp-red): Stamps, rose visa headers, form error text.
- **Consular Navy** (stamp-navy): Stamps, mist visa headers, the secondary button outline and text, input focus border and ring, links inside chat answers.
- **Customs Green** (stamp-green): Stamps, sage visa headers, result figures (project metrics on employer pages, the GPA numeral), the open-to-work status dot on the data page, form success text and the "received" stamp.
- **Seal Plum** (stamp-plum): Stamps (including the education seal) and the rosette inside the hologram seal.

### Neutral
- **Security Ivory** (paper): Page ground; also the photo-frame fill and bot chat bubbles.
- **Laid Paper** (paper-raised): Raised writing and record surfaces: employer record pages, the contact form body, inputs, the chat dialog.
- **Rose Page**, **Sage Page**, **Mist Page** (rose, sage, mist): Tinted security pages. Rose carries the data page; rose, sage and mist rotate across visa plates; sage carries the education certificate.
- **Passport Ink** (ink): Primary text, field values, skill names, highlight prose.
- **Faded Ink** (ink-soft): Secondary text, field labels, subtitles, descriptions, roles, the tech line.
- **Rule** (rule): Hairlines, always at reduced alpha: 15% between sections, 20% for field rows and dividers, 25% for card borders and list tops, 30% for input and photo-frame borders, 40% for skill dot separators, 50% for the tech-line middle dots. In light theme it is the ink navy; in dark theme it becomes gold, so every rule reads as gilt.
- **Guilloché A / B** (guilloche-a, guilloche-b): Stroke colours for the wave fields only. Rose and green in light theme, gold and burgundy in dark.

### Decorative (hologram only)
- **Hologram Peach, Mint, Periwinkle, Pink** (hologram-peach, hologram-mint, hologram-periwinkle, hologram-pink): The four stops of the hologram seal's conic gradient, rendered at 50% alpha (periwinkle at 45%) behind a plum rosette, with the whole seal at 80% opacity and a 1px white inner edge at 50%. They are fixed literals that do not swap with the theme, and they appear nowhere else.

### Named Rules
**The Signal Ink Rule.** Stamp inks are for marks and signals: stamps, visa headers, success and error states, the status dot, result figures, and the navy document action (secondary button, input focus). They never fill a surface; the only fill allowed is a 7% navy wash on secondary-button hover.

**The Gilt Rule Rule.** In dark theme every hairline is gold at low alpha and every heading is gold. Gold is foil, so it stays thin: hairlines, crest, focus ring, headings, dash bullets. Never a gold panel or gold button.

**The Leather Is The Cover Rule.** The grained burgundy leather texture belongs only to cover elements (navigation, footer, form and dialog headers, the floating button). Content cards are paper, never leather.

**The One Rainbow Rule.** The hologram stops are the only multi-hue values in the system and live only inside the hologram seal.

## Typography

**Display Font:** Noto Serif Display (with Georgia, serif)
**Body Font:** Be Vietnam Pro (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

All three load from Google Fonts with Vietnamese subsets so names such as "Phạm Hải Nam" set correctly in every hand.

**Character:** A high-contrast engraved serif does the speaking (names, headings, big numerals), an OCR-like mono does the printing (labels, values, MRZ, tech lines, buttons, navigation), and a neutral Vietnamese-ready sans carries the prose without competing.

### Hierarchy
- **Display** (800, about 3.6 to 7.25rem effective, 1.08 leading): Only the name on the data-page hero. Set as SVG text at 112 units in a 540-unit viewBox scaled to clamp(280px, 40vw, 560px) wide, filled with a rotated intaglio hatch pattern and a solid 1.6-unit outline; an `sr-only` copy carries the accessible name.
- **Greeting** (500 italic, clamp(1.25rem, 2vw, 1.6rem), faded ink): The salutation inside the hero `h1`, directly above the name. It is part of the heading's sentence, not a caption.
- **Headline** (700, clamp(2.5rem, 5vw, 4rem), 1.02, -0.02em): Section titles. Burgundy in light, gold in dark.
- **Lede** (500, clamp(1.5rem, 2.4vw, 2rem), 1.18, max 26ch): The role line under the name.
- **Title** (700, 1.75rem): Sub-section heads (skills, "or reach me", socials), the school name on the certificate. Employer names step up to 1.875rem; project names on employer pages and visa plates step down to 1.625rem; the lead visa plate uses clamp(1.75rem, 3vw, 2.5rem).
- **Role** (400 italic serif, 1.125rem, faded ink): The job role under an employer name and the degree under the school name. Visa-plate taglines use the same italic at 1rem, weight 500.
- **Figure** (800, clamp(3.5rem, 7vw, 5rem), tabular numerals, customs green): The GPA numeral on the certificate, followed by its scale in 1.5rem 500 faded ink.
- **Metric** (800, clamp(2.25rem, 4vw, 3.25rem), -0.02em, tabular numerals, customs green): A project's headline result on an employer page, right-aligned beside the project name from 640px, with a field-label caption under it (max 24ch).
- **Body** (400, 1.0625rem, 1.625, max 56ch): Prose. Section subtitles use 1.125rem at max 52 to 56ch.
- **Body Small** (400, 0.9375rem, 1.625): Descriptions inside cards, highlight bullets (max 72ch), project kind lines, chat text, form status.
- **Label** (400, 0.6875rem, 0.14em tracking, uppercase, mono): Document field captions (`dt`), metric captions, the passport header line, form field labels floating inside inputs. Locations relax to mixed case at 0.04em; visa destinations at 0.06em.
- **Label Rail** (400, 0.625rem, 0.1 to 0.12em tracking, uppercase, mono): Rail and bottom-tab captions, the rail status line, and data-page captions on phones.
- **Data** (400, 0.9375rem, 0.06em tracking, uppercase, tabular numerals, mono): Field values on the data page (stepping to 0.8125rem on narrow and lg widths), skill names and contact details (mixed case at 0.03em). The hero data strip sets its values at 1.125rem.
- **Data Period** (400, 0.875rem, 0.06em, uppercase, mono): Date ranges on employer pages and the certificate.
- **Data Compact** (400, 0.8125rem, mono): Visa type and stack values (0.06em), and the tech line on employer pages (mixed case, 0.02em, faded ink).
- **Button** (500, 0.8125rem, 0.16em tracking, uppercase, mono): All buttons. Compact buttons inside visa plates drop to 0.75rem; language toggles on the cover use 0.75rem at 0.14em.

The detector reads 0.625, 0.75, 0.8125, 0.875 and 0.9375rem and the clamp sizes as off a modular ramp. They are deliberate: the mono steps are the passport's printing sizes, a quarter-step apart so captions, values and buttons stay distinct without leaving the document register.

### Named Rules
**The Three Hands Rule.** Serif for what would be engraved or printed large, mono for what the passport machine prints, sans only for running prose. A heading is never mono; a field value is never serif.

**The Caption Is Not A Kicker Rule.** The tracked mono label style captions data that sits directly under it (a field value, a figure, an input). It is never placed as an eyebrow above a section headline.

**The Green Result Rule.** A big serif numeral in customs green means a measured result from the record (a metric, a GPA). Never use it for decoration or for counts with no source.

## Layout

A single-column document on a fixed cover. On desktop (1024px and up) a 96px leather rail is fixed to the left edge and content is offset by it; below 1024px a 56px leather strip is fixed to the top, and below 768px five leather section tabs (60px tall, safe-area aware) are fixed to the bottom. Content sits in a centred column capped at 1240px with 20px gutters, 40px from 768px.

The page runs in five sections: data page (home), experience, projects, skills and credentials, contact. Sections are separated by a 15% rule and padded 96px vertically (128px from 1024px). Each opens with a headline, a subtitle, then content 56px below.

- **Hero:** fills the viewport and splits into two equal columns on desktop: greeting and name, lede, summary, a three-cell data strip (ruled top and bottom, cells divided by 20% rules, max 520px) and actions on the left; the data page with stamps landing on its corners on the right.
- **Experience:** employer record pages stacked 48px apart. From 1024px each splits into a 300px record column (company, role, period, location, stamp) and a project column whose projects are divided by 20% rules; below that the record column becomes a header row with the stamp at its end. Padding 24px, 32px from 640px.
- **Projects:** a two-column grid from 768px in which every third plate spans both columns as a lead spread, with image and text side by side from 1024px (mirrored on every second spread).
- **Skills and credentials:** skill rows (1.4fr) beside the education certificate (1fr) from 1024px. Skill rows use a 190px caption column from 640px.
- **Contact:** the application form (1.3fr) with ruled contact rows and social buttons (1fr).

Stamps are positioned absolutely and overhang their cards by up to 70px; leave room around a stamped card rather than clipping it, and lift overhanging stamps above neighbouring content (z-10). The page ground carries a fixed full-viewport wave field at 22% opacity (8% in dark).

## Elevation & Depth

Depth is paper resting on a desk. Cards cast long, soft, burgundy-tinted shadows with heavy negative spread so only a low pool of shade shows beneath the sheet; nothing glows or floats. Inside cards, layering is done with tonal paper (raised paper over tinted page), hairline rules and guilloché, not with further shadow. The leather cover is flat with an inner grain and a gentle top-left light gradient.

### Shadow Vocabulary
- **Data page** (`box-shadow: 0 40px 70px -40px rgb(var(--burgundy-deep)/0.55), 0 2px 6px -2px rgb(0 0 0/0.12)`): The hero data page, the heaviest object on the page.
- **Record page** (`box-shadow: 0 30px 60px -44px rgb(var(--burgundy-deep)/0.55)`; 0.5 on the certificate): Employer pages and the education certificate, lying flatter than the data page.
- **Visa plate** (`box-shadow: 0 24px 50px -36px rgb(var(--burgundy-deep)/0.5)`; hover `0 32px 60px -34px rgb(var(--burgundy-deep)/0.6)` with a 2px lift): Project plates.
- **Application** (`box-shadow: 0 30px 60px -40px rgb(var(--burgundy-deep)/0.5)`): The contact form.
- **Primary button** (`box-shadow: inset 0 0 0 1px rgb(var(--on-burgundy)/0.25), 0 6px 14px -8px rgb(var(--burgundy-deep)/0.7)`): An embossed gold inner edge plus a short pool of shade.
- **Floating button** (`box-shadow: 0 12px 24px -10px rgb(var(--burgundy-deep)/0.8)`).
- **Dialog** (`box-shadow: 0 40px 80px -30px rgb(0 0 0/0.45)`): The chat assistant panel.

### Named Rules
**The Paper On Desk Rule.** Shadows are tinted with burgundy-deep and use a negative spread at least half their blur. A neutral, centred, glowing shadow does not belong in this world.

## Shapes

Corners are small and printed. Buttons and inputs use 3px, photo frames, rail items and cover toggles 4px, chat bubbles 8px with a 2px tail corner on the speaker's side, and every document card (data page, employer page, visa plate, certificate, application form, chat dialog) 10px, like the rounded corners of a passport page. Fully round shapes are reserved for the hologram seal, the floating button (with an inner gold ring inset 4px), the chat input pill and its send button, status dots and the 4px skill separators.

Borders are hairlines in the rule colour at 20 to 30% alpha. List bullets are ruled dashes: a 12px by 1px line in burgundy (gold in dark), set at 0.8em from the top of the line. Stamps are the one place for heavy strokes: an outer 4-unit ring plus an inner 1.5-unit ring, in oval, rounded-rectangle or circle shapes, rotated between -14 and 12 degrees and speckled by an SVG turbulence filter so they read pressed rather than printed.

## Components

### Buttons
Tactile, embossed, and set in the passport's printing hand.
- **Shape:** Nearly square corners (3px).
- **Primary:** Cover burgundy fill, gold-thread text, 1px burgundy-deep border, mono 500 uppercase with 0.16em tracking, 14px by 24px padding, 12px icon gap, embossed inner edge (see Elevation).
- **Hover / Focus:** Lifts 1px and deepens the inner edge and shadow over 200ms on the out-expo curve (`cubic-bezier(0.16, 1, 0.3, 1)`); presses down 1px on active. Focus is the global 2px gold outline at 3px offset. Disabled drops to 60% opacity.
- **Secondary:** Transparent with a 1px consular-navy border and navy text, same type and padding; hover adds a 7% navy wash and the same 1px lift. Social links use it at 12px by 16px.
- **Compact:** Inside visa plates both variants shrink to 10px by 16px padding and button-compact type.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** A tinted security page (rose, sage or mist) with a wave field at 50 to 70% opacity (20 to 30% in dark), or laid paper for record and writing surfaces with a wave field at 25% (10% in dark) on record pages.
- **Shadow Strategy:** Paper On Desk (see Elevation).
- **Border:** 1px rule at 25%.
- **Internal Padding:** 20px, 24px from 640px; the data page opens to 28px; employer pages and the certificate use 24px, 32px from 640px.

### Inputs / Fields
- **Style:** Laid-paper fill, 1px rule border at 30%, 3px corners, mono value text at 0.9375rem with 0.04em tracking. The field label sits inside the box top-left as a tracked mono caption, so every input reads as a printed form box; padding is 24px top, 10px bottom, 16px sides (32px top on the message area).
- **Focus:** Border turns consular navy with a 3px navy ring at 14%, over 200ms.
- **Placeholder:** Faded ink at 75%.
- **Chat variant:** The same field rounded into a full pill with a round 40px burgundy send button inside its right end.

### Navigation
- **Desktop rail:** 96px leather column. Gold crest at the top (56px, scales 5% on hover over 300ms). Five section links (data page, experience, projects, skills, contact) stack an icon (20px, 1.5 stroke) above a label-rail caption with a 24px gold hairline that appears under the active item; the active item also takes a 20% black wash, hover a 10% wash. Language and theme toggles (44px targets) and a pulsing open-to-work status sit at the foot above a 20% gold-thread rule.
- **Tablet strip:** 56px leather bar with crest and serif wordmark "Hainam.", four mono uppercase links (0.75rem, 0.14em) with the same active wash.
- **Phone:** The top strip keeps crest, assistant, language and theme; five section tabs (icon over label-rail caption) sit in a leather bar along the bottom edge.

### Data Page (signature)
The identity card in the hero. Rose page with a dense wave field; a header line with the serif document title (1.125rem, uppercase, 0.16em) and a mono type/code/number caption; a 3:4 photo in a 4px frame with the hologram seal overlapping its corner; ruled label and value pairs; and a two-line machine-readable zone set as SVG text stretched to fill exactly 44 characters per line. Three entry stamps (employers and education) land across its corners.

### Employer Record Page (signature)
A laid-paper page per employer. The record column holds the company in serif (1.875rem), the role in serif italic, the period as a data-period value, the location as a mixed-case field label, and the employer's entry stamp, already on the page. The project column lists each project with its serif name, a body-small kind line, an optional green metric with caption, ruled dash bullets for highlights, and a mono tech line in faded ink with middle-dot separators at 50% rule (an `sr-only` "Stack:" prefix keeps it readable to screen readers).

### Education Certificate (signature)
A sage page beside the skill rows: field-label caption, school name in title serif (max 14ch), degree in serif italic, period value, then a ruled block with the GPA figure in customs green and its scale in faded ink, followed by dash-bulleted honours. A plum circle stamp sits pressed into the top-right corner.

### Stamp (signature)
An inked mark in oval, rectangle or circle with three lines of mono bold text (top, main, bottom; circle text runs on arcs). Rendered at 88% opacity, rotated, speckled by an ink-absorption filter. In the hero and on a successful form send it presses in once: scale 1.35 to 1 and opacity 0 to 0.88 over 320ms on the out-expo curve, staggered 150ms apart. Stamps on employer pages, visa plates and the certificate are already on the page and do not animate. Reduced motion skips the press.

### Visa Plate (signature)
A project card. Tinted page rotating rose, sage, mist; a large serif uppercase "VISA" header in the matching stamp ink with the destination host on the right; a 16:10 screenshot in a 4px frame with an entry stamp overhanging its lower corner; project name and italic tagline; a ruled visa type and stack block; compact live-demo and code buttons; and a one-line MRZ footer. Every third plate is a lead spread across both columns.

### Endorsement Rows
Skill groups and contact details are ruled `dl` rows: a field-label caption column and a value row. Skill values are mono names (0.9375rem, 0.03em) separated by 4px round dots at 40% rule; contact values are mono links with a drawn underline on hover.

### Hologram Seal
A round iridescent conic-gradient disc (from 210deg through the four hologram stops) with a plum rosette at 55% drawn over it and a white inner edge, overlapping the photo corner. It is the one place literal rainbow values appear.

## Do's and Don'ts

### Do:
- **Do** take every colour from the CSS custom properties (`rgb(var(--token) / alpha)`) so light and dark swap together; the hologram stops are the only fixed literals.
- **Do** put labelled data in ruled rows: a mono uppercase caption (0.6875rem, 0.14em) over or beside a mono value, separated by rule hairlines at 20%.
- **Do** list highlights with ruled dash bullets (12px by 1px, burgundy in light, gold in dark) and tech as a mono line with middle-dot separators.
- **Do** frame new navigation, dialogs and form headers in the leather texture with gold-thread text and the gold crest.
- **Do** use stamps for dated facts (employers, honours, entries, receipts), with real text only, and let them overhang the card edge above neighbouring content.
- **Do** set measured results as a big serif numeral in customs green with a field-label caption naming the measure.
- **Do** keep motion to the single press for stamps and 200 to 300ms out-expo lifts for hover; honour reduced motion.
- **Do** keep headings burgundy in light and gold in dark.

### Don't:
- **Don't** fill a name or heading with a gradient, tilt a photo card, run a logo marquee, or lay projects out as a grid of identical cards; that is the template this world replaced.
- **Don't** use stamp inks as surface fills or apply leather texture to content cards.
- **Don't** loop, wobble or re-trigger stamp animations on scroll; a stamp lands once and stays still.
- **Don't** use the tracked mono caption as an eyebrow above a section headline.
- **Don't** show tech skills as chips, pills or progress bars; use endorsement rows or the dot-separated tech line.
- **Don't** use neutral glowing shadows; shadows are burgundy-deep tinted with negative spread.
- **Don't** use the hologram stops, or any other multi-hue gradient, outside the hologram seal.

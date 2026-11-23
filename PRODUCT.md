# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Anyone who lands here to understand who Carter Nguyen is — not a single hiring funnel. Visitors may be recruiters, peers, collaborators, or curious strangers. Their job is to get a clear, memorable sense of the person: what he builds, what he is working on, and how he lives outside work.

## Product Purpose

A personal site that acts as a single source of truth for Carter — identity, projects, experience, and life outside code. Success means a visitor leaves feeling they met a well-rounded person, not that they scanned a résumé online.

## Positioning

A well-rounded student with real professional endeavors and clear aspirations — AI/product engineering internships and shipped campus tools first; outdoor and creative life as secondary proof of range. Not a dark art portfolio; not a résumé dump.

## Operating Context

Visited as a destination link from résumés, LinkedIn, GitHub, and word of mouth. Primary evaluation is a short first visit on desktop or phone. Soft conversion paths already exist (email, résumé PDF, GitHub, LinkedIn); the site’s job is presence and understanding first, contact second.

## Capabilities and Constraints

- Single-page / multi-route personal portfolio on Next.js (existing codebase; visual world to be replaced).
- Must present: who Carter is, what he is working on, professional experience, and hobbies/life outside work.
- Soft actions: contact email, résumé download, GitHub, LinkedIn — no booking product required.
- Primary CTA hierarchy still open among those soft actions.
- Structure preference: Apple-like continuous scroll with scroll-tied animation as the home spine; secondary routes (e.g. project case studies) allowed as rooms off that spine.
- First-viewport preference: **professional work and experience lead**; hobbies/outdoors are a **secondary accent** (texture, proof of range) — not equal co-heroes.
- Visitor read: well-rounded **student** with professional endeavors and aspirations.
- Workflow default: **comp-first** builds for showcase surfaces (recorded in `.impeccable/config.json`).
- **Rejected direction:** Still Scroll / dark nocturnal gallery cinema — too dark; does not feel like Carter.

## Brand Commitments

- Name: Carter Nguyen; site: carternguyen.dev.
- Voice today: direct, builder-oriented, curious; not corporate résumé-speak.
- Rebuild is a **replacement visual world**, not a polish of the current look. Old UI is anti-reference.
- Binding visitor experience: **premium**, distinctive, cinematic scroll storytelling — Apple MacBook Pro product-page craft as the quality bar, not a template copy.
- Standing preference: **dark cinematic ground** (`#08090B` / `#17191D`), silver text (`#F5F5F7` / `#86868B`), cool accent (`#8DA9D7`); oversized clean sans; restrained motion; project showcases over card grids.
- Hierarchy: internships, projects, and case studies own the narrative; hobby life appears as soft accent (real photos), not co-hero.
- Density: quiet and premium — sparse copy, generous air, one idea per viewport. Reject dense résumé walls, neon/glass costume, and skill-icon grids.

## Evidence on Hand

- Professional facts and case studies in `src/data/projects.ts`, `src/data/experience.ts` (e.g. UREC Radar, Roamer, Dark Wolf internship, incoming Deloitte AI & Data Engineering role, JMU research).
- Site copy and links in `src/data/site.ts`.
- Résumé: `public/resume.pdf`.
- Profile image: `public/images/profile.jpg`.
- Real life photos (supplied for rebuild) under `public/images/life/`:
  - `climbing-gym.jpg` — indoor bouldering
  - `makeathon.jpg` — Make-A-Thon / competition moment
  - `vietnam-temple.jpg` — travel (Vietnam temple)
  - `djing.jpg` — DJing a set
  - `skiing.jpg` — on-mountain skiing
  - `sunset-hike.jpg` — mountain overlook / hike
  - `waterfall-hike.jpg` — woods waterfall hike
- Confirmed hobbies still light on dedicated media: motorcycles, cars (photos not yet supplied).
- Interest stubs in `src/data/interests.ts` need updating to match real photos and the fuller hobby set.
- **Do not fabricate** testimonials, metrics, photos, or hobby stories. Author structure around real facts; mark gaps where personal photos/stories are still needed.

## Product Principles

1. Person first, résumé second — work proves capability; life proves range.
2. One place of truth — visitors should not need LinkedIn to understand Carter.
3. Feel, don’t claim — hobbies and outdoors should be sensed through the experience, not only asserted in copy.
4. Premium and interactive over template-safe — distinctive craft is part of the product.
5. Honest evidence only — ship real projects, roles, and assets; leave gaps visible rather than inventing proof.

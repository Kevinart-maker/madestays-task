# Madestays Vault — Owner Onboarding Dashboard

This is my implementation of the Client Portal dashboard and designed a figma for it in my own style: a property
owner's onboarding tracker showing every property, its live/in-progress/action-required
status, and a step-by-step onboarding checklist per property.

Figma I designed : https://shorturl.at/ra913

## How to run it

You'll need Node 20 or later. From the project root:

```bash
npm install
npm run dev
```

Then open http://localhost:3000 (the dev server will fall back to the next free port,
3001 and up, if 3000 is already taken).

For a production build, `npm run build` compiles and type-checks the app, and `npm
start` serves it. `npm run lint` runs ESLint on its own if you just want that.

There's no real backend behind this — `lib/data.ts` returns the JSON dataset from
`lib/mock-data.ts` behind an artificial ~300ms delay, which is what the skeleton loader
on first load is covering for. The page is rendered dynamically rather than statically
built, specifically so that delay (and the skeleton) happens on every request instead
of only once at build time.

## Assumptions I made

The brief gave me the property/owner JSON, but a few things weren't
fully specified, so I made calls on them.

I designed my own figma for the client portal, but I made sure it looks exactly alike


The JSON only carries a status per onboarding step, not one for the property as a
whole, so I derived a property-level status to match the "Live / In Progress / Action
Required" tabs and stat cards in Figma: if any step is `action_required` that wins,
since it's blocking the owner; if all ten steps are `complete` the property is `live`;
everything else falls under `in_progress`, including a property with no steps recorded
at all. That also means a step marked `not_started` gets folded into the "In Progress"
bucket at the property-summary level, since Figma only has three top-level categories —
the full step-level detail, `not_started` included, still shows in the property
checklist itself.

One property has a step status, `on_hold`, that isn't in the provided status legend. I
didn't want the UI to choke on data it wasn't told about, so it gets its own badge
instead of breaking or silently vanishing.

I wired up the two chart widgets on the stat cards I put in the Figma file, so the
bar chart mirrors the live/in-progress/action-required counts, and the monthly progress
bars show average onboarding completion for properties targeting go-live in each month.

Two properties in the dataset have no usable image — one has an empty `image` string,
and one points at a URL that 404s. I treated both as the same "no image available"
case with a fallback tile, rather than letting either show a broken image.

I also designed the property detail view in the figma file, to show step notes and statuses.

## What I'd do with more time

If I had more time, the main thing I'd go back and fix is the loading experience: right
now the skeleton covers the whole dashboard as one block, so the stat cards and the
property list all appear together once the data resolves. I'd rather split those apart
so the properties list and the stats overview load independently — the stats can render
as soon as they're ready, and the list can keep its own skeleton and pop in on its own
timeline. That way the app still feels fast and responsive even if the property list
itself ends up being the slower piece to load.

Beyond that, I'd want proper tests around the status-derivation and filtering logic,
a deeper accessibility pass on the custom dropdowns and the modal's focus handling, and
to turn the checklist from something read-only into something an owner can actually act
on — uploading the missing certificate for a blocked step, for example, instead of just
seeing the note.

## Where I used AI tools

I used AI (Claude Code) while writing the code for this — I gave it the design I'd
already worked out and the Figma links, and prompted it to help me build faster,
reading the Figma file directly and generating the component structure and
implementation from there. I reviewed what it produced as I went and tweaked or
rewrote the parts myself where it didn't get something right.

The session transcripts are in [`ai-sessions/`](./ai-sessions/) if you want to see how
that went in detail.
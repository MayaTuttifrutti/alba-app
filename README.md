# Alba

**Proactive financial resilience for freelancers.** A clickable concept prototype of an AI-first fintech app that closes the *Volatility Gap* between irregular income and tax obligations for European freelancers.

> Concept project. No live product, no real bank data, no real AI behind it. Every number is sample data, kept consistent with the Figma screens.

The principle behind the product: **Alba proposes, the user decides.** Nothing happens without an explicit yes.

## Try it

- **Live app:** add your Vercel URL here after deploying.
- **Figma prototype:** add the prototype link here.
- Deep links for the portfolio: `/?start=home` opens Home, `/?start=alert` opens Home with the Survival Mode alert, `/?start=reserve` opens the Tax Guard flow.

Suggested path for a first visit: *Get started → Connect securely → tap the runway card → See options → Apply 2 actions → Back to home → explore the tab bar.*

## What is inside

| Area | What it shows |
| --- | --- |
| Onboarding | Welcome and a read-only account connection |
| Runway (Home) | One headline number: days of safety left, plus Safe to spend |
| Income | Expected vs received income, six-month chart, invoices |
| Taxes | Smart Tax Guard: VAT and income tax set aside automatically |
| Safety | Safety buffer, Survival Mode switch, recent reversible actions |
| Advisor | Chat for questions such as "Can I afford this laptop?" (prepared replies) |
| AI Survival Mode | Alert → Choice (three reversible actions) → Recovery (runway 9 → 21 days) |
| Tax Guard flow | Reserve locked → Tax reserve (payment breakdown, €960 set aside) → Ask Alba |

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4. No backend and no database: the whole prototype is a small client-side state machine in `src/components/AlbaApp.tsx`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. On a laptop the app sits inside a phone frame; on a phone it fills the screen.

```bash
npm run build      # production build, the same one Vercel runs
npm run typecheck  # TypeScript only
```

Requires Node.js 18.18 or newer (20+ recommended).

## Project structure

```
src/
  app/            layout, page, globals.css (design tokens)
  components/     AlbaApp (state and flow), PhoneFrame, TabBar, ui (Button, Chip, ListRow...)
  screens/        one file per screen, plus the Survival Mode alert overlay
  data/alba.ts    sample data and types
  lib/            useCountUp (animated numbers, respects reduced motion)
docs/SPEC.md      full specification: tokens, screens, flow, next steps
```

Design tokens are copied from the Figma file (`Alba / Design System`) into `src/app/globals.css`. See `docs/SPEC.md` for the mapping.

## Limits (on purpose)

- Sample data only. No real accounts, no real tax logic.
- The Advisor answers a few prepared questions. See "Next steps" in `docs/SPEC.md` for how a real model would be connected.
- Light theme only.
- Impact numbers quoted in the case study (70% less research time, Clarity Score 53 → 61, 40% front-end time saved) are estimates or simulations, not measurements from this app.

## Author

Maya Touati · product designer.

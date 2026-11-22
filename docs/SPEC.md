# Alba prototype: specification

Source of truth for design: Figma file `Alba / Design System` and `Alba / Screens` (pages in the same file). This document lists what the code implements and where it intentionally differs.

## 1. Product principles

1. **Alba proposes, the user decides.** No state change without a tap on a clearly labelled action.
2. **Care, not alarm.** The risk alert is a dimmed banner over the real Home screen, never a full-screen takeover.
3. **Reversible actions.** Every Survival Mode action is described as undoable.
4. **One number first.** Home leads with a single figure: days of safety left.

## 2. Stack and decisions

| Choice | Reason |
| --- | --- |
| Next.js App Router, TypeScript | Standard for Vercel, deploys with zero configuration |
| Tailwind CSS v4, tokens in CSS `@theme` | Tokens map 1:1 to Figma variables |
| One client-side state machine | A concept prototype needs no backend; keeps the app testable by anyone in a browser |
| Inter via `next/font` | Matches the Figma text styles |

## 3. Design tokens

Primitives (Figma collection `Primitives`) and semantic tokens (collection `Color`) live in `src/app/globals.css`.

| Primitive | Hex | | Semantic token | Primitive |
| --- | --- | --- | --- | --- |
| ink/900 | `#141B2D` | | `bg/app` | cream/50 `#FBF8F3` |
| ink/700 | `#2A3550` | | `bg/surface` | white |
| ink/500 | `#5B6682` | | `bg/muted` | ink/50 |
| ink/300 | `#A9B0C2` | | `bg/brand` | ink/900 |
| ink/100 | `#E6E8EF` | | `bg/safe`, `bg/warn`, `bg/risk` | sage/100, dawn/100, coral/100 |
| ink/50 | `#F4F5F8` | | `text/primary`, `text/secondary` | ink/900, ink/500 |
| dawn/600, 500, 300, 100 | `#D9822B` `#F5A35C` `#F9C998` `#FDEBD6` | | `text/safe`, `text/warn`, `text/risk` | sage/600, dawn/600, coral/600 |
| sage/700, 600, 500, 100 | `#256354` `#2F7D6B` `#3E9A85` `#DDF0EA` | | `border/default` | ink/100 |
| coral/600, 100 | `#C8553D` `#FBE3DD` | | `action/primary`, `action/accent` | ink/900, dawn/500 |
| cream/50 | `#FBF8F3` | | `accent/safe`, `accent/dawn-soft` | sage/500, dawn/300 |

Tailwind class names: `bg-app`, `bg-surface`, `bg-brand`, `text-fg`, `text-fg-2`, `text-safe-fg`, `border-line`, `bg-accent`, `bg-accent-safe`, and so on.

Radius: `sm` 8, `md` 12, `lg` 20, `xl` 28, `full` pill. Spacing follows the Figma scale 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 through Tailwind's default spacing.

Type styles (utilities in `globals.css`): `t-num` 56/700, `t-h1` 28/600, `t-h2` 20/600, `t-h3` 16/600, `t-body-l` 16/400, `t-body-m` 14/400, `t-label` 14/600, `t-caption` 12/500, `t-overline` 11/600 uppercase.

## 4. Information architecture

Five pillars, shown as the tab bar:

| Tab | Route state | Purpose |
| --- | --- | --- |
| Runway | `home` | Days of safety left, Safe to spend, Tax Guard summary |
| Income | `income` | Expected vs received, six months, invoices |
| Taxes | `taxes` | VAT and income tax set aside, Alba's suggestion |
| Safety | `safety` | Safety buffer, Survival Mode switch, recent actions |
| Advisor | `advisor` | Conversational interface |

Outside the tab bar: `welcome`, `connect` (onboarding), `choice`, `recovery` (Survival Mode), `reserve`, `reserve-detail` (Tax Guard flow).

## 5. Flow and state

State in `AlbaApp`:

- `stack: ScreenId[]`, the last entry is on screen. Tabs replace the stack, forward navigation pushes, Back pops.
- `runway: number`, 47 (healthy) → 9 (after the simulated dip) → 9 + gains (after applying actions).
- `alertOpen: boolean`, the Survival Mode banner over Home.
- `selected: string[]`, ticked actions on Choice (default: `subs`, `remind`).
- `applied: string[]`, actions confirmed, used to list "What changed" on Recovery.

```
welcome ──Get started──► connect ──Connect / Skip──► home
   └──I already have an account────────────────────► home

home ──tap runway card──► (runway counts 47→9) ──► alert over home
safety ──tap Survival Mode card──► home + same dip

alert ──See options──► choice ──Apply──► recovery ──Back to home──► home (runway 9 + gains)
  │                       ├──Do nothing for now──► home
  └──Not now / scrim──► home (runway stays 9, status "At risk")
choice ──Back──► alert

home ──Tax Guard card──► reserve ──View allocation details──► reserve-detail ──Ask Alba about this──► advisor
reserve ──Back──► home      reserve-detail ──Back──► reserve      "View tax reserve" scrolls to the breakdown
```

Rules:

- Home status chip: `At risk` when runway < 14 days, otherwise `On track`.
- Runway after applying = 9 + sum of selected `gainDays` (4 + 8 + 12 available). With the defaults: 9 → 21.
- *Safe to spend* is interpolated between €310 (9 days) and €1,840 (47 days).
- *Apply* is disabled with zero actions selected.
- Numbers animate (`useCountUp`); animation is skipped for `prefers-reduced-motion`.

## 6. Screens

| Screen | File | Notes |
| --- | --- | --- |
| Welcome | `screens/Welcome.tsx` | Hero runway card, promise, two actions |
| Connect account | `screens/Connect.tsx` | Read-only banks, security note |
| Home / Runway | `screens/Home.tsx` | Runway card is the demo trigger; hint text below it |
| Alert | `screens/AlertOverlay.tsx` | Dialog with scrim; "Not now" and scrim both dismiss |
| Choice | `screens/Choice.tsx` | Three reversible actions as checkboxes with projected runway |
| Recovery | `screens/Recovery.tsx` | Before/after, what changed, reassurance |
| Reserve locked | `screens/ReserveLocked.tsx` | "47 days secured", Tax Guard active card; Download report is a sample (no file) |
| Tax reserve | `screens/TaxReserve.tsx` | Dark header covers the status bar; €2,400 payment → €456 VAT (19%) + €504 income tax (21%) = €960 reserved, €1,440 available |
| Income | `screens/Income.tsx` | Bars use fixed pixel heights from sample data |
| Taxes | `screens/Taxes.tsx` | VAT / income tax split |
| Safety | `screens/Safety.tsx` | Switch is local state only |
| Advisor | `screens/Advisor.tsx` | Prepared replies, free text gets a generic answer |

## 7. Sample data

All in `src/data/alba.ts`. Key figures: runway 47 days healthy / 9 at risk, Safe to spend €1,840 / €310, tax reserve €2,310 (VAT €980, income tax €1,330), safety buffer €1,200 of €2,000, expected income €6,200 (€4,200 received).

## 8. Accessibility

- Interactive elements are real `<button>`s with labels; the alert is a modal dialog; the Survival Mode switch has `role="switch"`.
- Colour is never the only signal: status chips carry text.
- Reduced motion is respected for screen transitions and count-ups.
- To verify before publishing: contrast of `text-fg-2` on `bg-app`, and `warn` text (`#D9822B`) on `#FDEBD6`, which may be below 4.5:1 for small text.

## 9. Known differences from Figma

- The phone frame and 9:41 status bar are drawn only from 640px up; on a real phone the app is full screen.
- Home after applying actions shows the new runway instead of resetting to 47, so the story stays consistent.
- The Tax Guard flow follows the Figma board "User flow - Alba - Predictive Runway". The Tax reserve screen is one scrollable page in code; Figma shows it twice (top and scrolled). "Ask Alba about this" opens the regular Advisor tab.

## 10. Next steps (not built)

1. **Real Advisor.** Add a server route (`app/api/advisor/route.ts`) that calls the Anthropic API with the user's runway, taxes and bills as context. Keep the API key in a Vercel environment variable, never in client code. Keep the human-in-the-loop rule: the model proposes, the user approves.
2. **Real data.** Connect an Open Banking aggregator for transactions; compute runway from them instead of fixed numbers.
3. **Tests.** Unit tests for `projectedRunway` and `safeToSpend`; a Playwright test for the main path.
4. **Code Connect.** Map Figma components (Button, Status Chip, List Row, Tab Bar) to `components/ui.tsx` and `TabBar.tsx`.

/**
 * Sample data for the Alba concept prototype.
 * Numbers are consistent with the Figma screens (Alba / Screens). Nothing here is real.
 */

export type ScreenId =
  | "welcome"
  | "connect"
  | "home"
  | "income"
  | "taxes"
  | "safety"
  | "advisor"
  | "choice"
  | "recovery";

export type TabId = "home" | "income" | "taxes" | "safety" | "advisor";

export const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Runway" },
  { id: "income", label: "Income" },
  { id: "taxes", label: "Taxes" },
  { id: "safety", label: "Safety" },
  { id: "advisor", label: "Advisor" },
];

export const USER = { name: "Maya", today: "Thu 19 Nov" };

/** Runway before the simulated cash dip, and the dip itself. */
export const RUNWAY_HEALTHY = 47;
export const RUNWAY_AT_RISK = 9;
export const RUNWAY_THRESHOLD = 14;
const RUNWAY_BAR_MAX = 67;

export const SAFE_TO_SPEND_HEALTHY = 1840;
export const SAFE_TO_SPEND_AT_RISK = 310;

export function safeToSpend(days: number): number {
  if (days >= RUNWAY_HEALTHY) return SAFE_TO_SPEND_HEALTHY;
  if (days <= RUNWAY_AT_RISK) return SAFE_TO_SPEND_AT_RISK;
  const t = (days - RUNWAY_AT_RISK) / (RUNWAY_HEALTHY - RUNWAY_AT_RISK);
  return Math.round(SAFE_TO_SPEND_AT_RISK + t * (SAFE_TO_SPEND_HEALTHY - SAFE_TO_SPEND_AT_RISK));
}

export function runwayProgress(days: number): number {
  return Math.max(0.04, Math.min(1, days / RUNWAY_BAR_MAX));
}

export const eur = (n: number) => "€" + n.toLocaleString("en-US");

/* Home / Income */
export const INVOICES = [
  { id: "lumen", initial: "L", client: "Lumen GmbH", note: "Invoice #218 · paid", amount: 2400, paid: true },
  { id: "nord", initial: "S", client: "Studio Nord", note: "Invoice #214 · 7 days overdue", amount: 1800, paid: false },
];

export const INCOME = {
  expected: 6200,
  received: 4200,
  stillExpected: 2000,
  months: [
    { label: "Jun", value: 40 },
    { label: "Jul", value: 52 },
    { label: "Aug", value: 34 },
    { label: "Sep", value: 60 },
    { label: "Oct", value: 46 },
    { label: "Nov", value: 80, current: true },
  ],
};

/* Taxes */
export const TAXES = {
  total: 2310,
  vat: 980,
  incomeTax: 1330,
  suggestion:
    "Keep 40% of each payment aside. At your pace that covers next quarter with €310 to spare.",
  payments: [
    { id: "lumen", initial: "L", client: "Lumen GmbH", note: "€960 set aside (40%)", amount: 2400, done: true },
    { id: "nord", initial: "S", client: "Studio Nord", note: "Pending · €720 will be set aside", amount: 1800, done: false },
  ],
};

/* Safety */
export const SAFETY = {
  buffer: 1200,
  target: 2000,
  actions: [
    { id: "a1", initial: "P", title: "Payment reminder sent", note: "Lumen GmbH · 28 Oct" },
    { id: "a2", initial: "S", title: "1 subscription paused", note: "Until 12 Dec · 12 Oct" },
  ],
};

/* AI Survival Mode */
export type SurvivalOption = {
  id: string;
  title: string;
  reason: string;
  gainDays: number;
  changed: string;
};

export const SURVIVAL_OPTIONS: SurvivalOption[] = [
  {
    id: "subs",
    title: "Pause 3 subscriptions",
    reason: "Unused for 60+ days. Resume anytime.",
    gainDays: 4,
    changed: "3 subscriptions paused until 19 Dec",
  },
  {
    id: "remind",
    title: "Remind Studio Nord",
    reason: "€1,800 is 7 days overdue. A friendly nudge, sent from you.",
    gainDays: 8,
    changed: "Reminder sent to Studio Nord",
  },
  {
    id: "buffer",
    title: "Move €400 from Safety",
    reason: "Returns automatically with your next payment.",
    gainDays: 12,
    changed: "€400 moved from your safety buffer",
  },
];

export const DEFAULT_SELECTED = ["subs", "remind"];

/* Advisor */
export type ChatMessage = { id: string; from: "alba" | "user"; text: string };

export const ADVISOR_INTRO: ChatMessage[] = [
  {
    id: "m1",
    from: "alba",
    text: "Hi Maya. Ask me anything about your money. I will never act without your approval.",
  },
  { id: "m2", from: "user", text: "Can I afford a €900 laptop this month?" },
  {
    id: "m3",
    from: "alba",
    text: "Yes. After taxes and bills you can spend €1,840. The laptop would take your runway from 47 to 40 days. Want me to plan it?",
  },
];

export const ADVISOR_REPLIES = {
  plan: {
    user: "Yes, plan it",
    alba: "Done, as a draft. I set €900 aside for the laptop and kept your tax reserve untouched. Nothing is spent until you confirm.",
  },
  skip: {
    user: "Not this month",
    alba: "Understood. Your runway stays at 47 days. I will check again after your next client payment.",
  },
  generic:
    "Good question. In this concept prototype I only answer a few prepared questions. In a real product I would check your runway, taxes and upcoming bills before answering.",
};

/* Onboarding */
export const BANKS = [
  { id: "revolut", initial: "R", name: "Revolut Business" },
  { id: "n26", initial: "N", name: "N26 Business" },
  { id: "wise", initial: "W", name: "Wise" },
];

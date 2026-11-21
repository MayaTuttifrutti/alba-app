"use client";

import { Icon, ListRow, ProgressBar, RowsCard, StatusChip } from "@/components/ui";
import {
  INVOICES,
  RUNWAY_THRESHOLD,
  TAXES,
  USER,
  eur,
  runwayProgress,
  safeToSpend,
} from "@/data/alba";
import { useCountUp } from "@/lib/useCountUp";

export function HomeScreen({
  runway,
  onRunwayTap,
  onTaxGuard,
}: {
  runway: number;
  onRunwayTap: () => void;
  onTaxGuard: () => void;
}) {
  const days = useCountUp(runway, { duration: 1200 });
  const spend = useCountUp(safeToSpend(runway), { duration: 1200 });
  const atRisk = runway < RUNWAY_THRESHOLD;

  return (
    <div className="alba-screen flex h-full flex-col gap-6 overflow-y-auto px-6 pb-6 pt-4">
      <header className="flex items-end justify-between">
        <div>
          <div className="t-caption text-fg-2">{USER.today}</div>
          <h1 className="t-h2">Good morning, {USER.name}</h1>
        </div>
        <StatusChip tone={atRisk ? "risk" : "safe"}>{atRisk ? "At risk" : "On track"}</StatusChip>
      </header>

      <div>
        <button
          type="button"
          onClick={onRunwayTap}
          aria-label="Runway. Tap to simulate a cash dip."
          className="flex w-full flex-col gap-3 rounded-xl bg-brand p-6 text-left text-fg-inverse transition active:scale-[0.99]"
        >
          <span className="t-overline opacity-70">Predictive runway</span>
          <span className="flex items-baseline gap-2">
            <span className="t-num tabular-nums">{days}</span>
            <span className="t-h2">days</span>
          </span>
          <span className="t-body-l opacity-75">of safety at your current pace</span>
          <ProgressBar value={runwayProgress(runway)} trackClass="bg-ink-500" fillClass="bg-accent" />
          <span className="mt-1 flex items-end justify-between border-t border-ink-700 pt-4">
            <span>
              <span className="t-overline block opacity-70">Safe to spend</span>
              <span className="mt-1 block text-[28px] font-bold leading-9 tabular-nums">{eur(spend)}</span>
            </span>
            <span className="t-caption text-right opacity-70">
              after taxes
              <br />
              and bills
            </span>
          </span>
        </button>
        <p className="mt-2 text-center t-caption text-fg-2">Tap the runway card to simulate a cash dip</p>
      </div>

      <button
        type="button"
        onClick={onTaxGuard}
        className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 text-left"
      >
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-safe-bg text-safe-fg">
          <Icon name="shield" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block t-label">Tax Guard</span>
          <span className="block truncate t-caption text-fg-2">{eur(TAXES.total)} set aside for VAT and tax</span>
        </span>
        <Icon name="arrow" className="text-fg-2" />
      </button>

      <section className="flex flex-col gap-3">
        <h2 className="t-h3">Recent income</h2>
        <RowsCard>
          {INVOICES.map((inv) => (
            <ListRow
              key={inv.id}
              initial={inv.initial}
              title={inv.client}
              subtitle={inv.paid ? inv.note : "Invoice #214 · due 12 Nov"}
              amount={(inv.paid ? "+" : "") + eur(inv.amount)}
              positive={inv.paid}
            />
          ))}
        </RowsCard>
      </section>
    </div>
  );
}

"use client";

import { ListRow, ProgressBar, RowsCard, ScreenTitle, StatusChip } from "@/components/ui";
import { INCOME, INVOICES, eur } from "@/data/alba";

export function IncomeScreen() {
  return (
    <div className="alba-screen flex h-full flex-col gap-6 overflow-y-auto px-6 pb-6 pt-4">
      <ScreenTitle title="Income" right={<StatusChip tone="safe">On track</StatusChip>} />

      <div className="flex flex-col gap-3 rounded-xl bg-brand p-6 text-fg-inverse">
        <div className="t-overline opacity-70">Expected this month</div>
        <div className="t-num tabular-nums">{eur(INCOME.expected)}</div>
        <div className="t-body-l opacity-75">
          {eur(INCOME.received)} received · {eur(INCOME.stillExpected)} expected
        </div>
        <ProgressBar value={INCOME.received / INCOME.expected} trackClass="bg-ink-500" fillClass="bg-accent-safe" />
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4">
        <h2 className="t-h3">Last 6 months</h2>
        <div className="flex items-end justify-between" role="img" aria-label="Monthly income, November highest">
          {INCOME.months.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-2">
              <div
                className={`w-7 rounded-sm ${m.current ? "bg-accent" : "bg-accent-safe"}`}
                style={{ height: m.value }}
              />
              <span className="t-caption text-fg-2">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="t-h3">Invoices</h2>
        <RowsCard>
          {INVOICES.map((inv) => (
            <ListRow
              key={inv.id}
              initial={inv.initial}
              title={inv.client}
              subtitle={inv.note}
              amount={(inv.paid ? "+" : "") + eur(inv.amount)}
              positive={inv.paid}
            />
          ))}
        </RowsCard>
      </section>
    </div>
  );
}

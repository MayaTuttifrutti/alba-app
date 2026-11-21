"use client";

import { ListRow, RowsCard, ScreenTitle, StatusChip } from "@/components/ui";
import { TAXES, eur } from "@/data/alba";

export function TaxesScreen() {
  return (
    <div className="alba-screen flex h-full flex-col gap-6 overflow-y-auto px-6 pb-6 pt-4">
      <ScreenTitle title="Taxes" right={<StatusChip tone="safe">On track</StatusChip>} />

      <div className="flex flex-col gap-3 rounded-xl bg-brand p-6 text-fg-inverse">
        <div className="t-overline opacity-70">Set aside this year</div>
        <div className="t-num tabular-nums">{eur(TAXES.total)}</div>
        <div className="t-body-l opacity-75">Tax Guard sets it aside automatically</div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <span className="t-overline opacity-70">VAT</span>
            <span className="t-h2 tabular-nums">{eur(TAXES.vat)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="t-overline opacity-70">Income tax</span>
            <span className="t-h2 tabular-nums">{eur(TAXES.incomeTax)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg bg-safe-bg p-4 text-safe-fg">
        <div className="t-overline">Alba suggests</div>
        <p className="t-body-m">{TAXES.suggestion}</p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="t-h3">Latest payments</h2>
        <RowsCard>
          {TAXES.payments.map((p) => (
            <ListRow
              key={p.id}
              initial={p.initial}
              title={p.client}
              subtitle={p.note}
              amount={(p.done ? "+" : "") + eur(p.amount)}
              positive={p.done}
            />
          ))}
        </RowsCard>
      </section>
    </div>
  );
}

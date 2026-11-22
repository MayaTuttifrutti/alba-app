"use client";

import { useRef } from "react";
import { Button, Icon, ListRow, RowsCard } from "@/components/ui";
import { TAX_RESERVE, USER, eur } from "@/data/alba";

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between t-body-m">
      <span className="text-fg-2">{label}</span>
      <span className={strong ? "t-h3 text-safe-fg" : "t-label"}>{value}</span>
    </div>
  );
}

export function TaxReserveScreen({ onBack, onAsk }: { onBack: () => void; onAsk: () => void }) {
  const breakdown = useRef<HTMLDivElement>(null);
  const r = TAX_RESERVE;

  return (
    <div className="alba-screen flex h-full flex-col overflow-y-auto">
      <header className="flex flex-none flex-col gap-4 rounded-b-xl bg-brand px-6 pb-8 pt-4 text-fg-inverse">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-fg-inverse/70 text-fg-inverse"
        >
          <Icon name="back" />
        </button>
        <h1 className="t-h1">
          {eur(r.reserved)} was set aside the moment {USER.name} got paid.
        </h1>
        <p className="t-body-l">
          A client payment of {eur(r.payment)} landed today. Alba reserved your VAT and income tax before you could spend it.
        </p>
        <div>
          <Button size="S" variant="secondary" onClick={() => breakdown.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
            View tax reserve
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-6 px-6 pb-8 pt-6">
        <div ref={breakdown} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
          <h2 className="t-h3">Payment breakdown</h2>
          <Line label="Incoming payment" value={eur(r.payment)} />
          <Line label={`Reserved · VAT (${r.vat.rate}%)`} value={eur(r.vat.amount)} />
          <Line label={`Reserved · income tax (${r.incomeTax.rate}%)`} value={eur(r.incomeTax.amount)} />
          <div className="border-t border-line pt-3">
            <Line label="Available to spend" value={eur(r.available)} strong />
          </div>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="t-h3">Recent reserves</h2>
          <RowsCard>
            {r.recent.map((p) => (
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

        <div className="flex flex-col gap-2 rounded-lg bg-brand p-4 text-fg-inverse">
          <h2 className="t-h3">Reserved automatically</h2>
          <p className="t-body-m opacity-90">
            No manual steps needed. Funds move to your tax vault the instant a client payment lands.
          </p>
          <button type="button" onClick={onAsk} className="mt-1 self-start t-label text-accent">
            Ask Alba about this →
          </button>
        </div>
      </div>
    </div>
  );
}

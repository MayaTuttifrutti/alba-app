"use client";

import { BackButton, Button, Icon, ListRow, RowsCard } from "@/components/ui";
import { BANKS } from "@/data/alba";

export function ConnectScreen({
  onBack,
  onConnect,
  onSkip,
}: {
  onBack: () => void;
  onConnect: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="alba-screen flex h-full flex-col gap-6 overflow-y-auto px-6 pb-8 pt-4">
      <div className="flex items-center justify-between">
        <BackButton onClick={onBack} />
        <span className="t-caption text-fg-2">Step 2 of 2</span>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="t-h1">Connect your account</h1>
        <p className="t-body-l text-fg-2">
          Alba reads your income and bills to forecast your runway. Access is read-only: Alba cannot move money
          without your approval.
        </p>
      </div>

      <RowsCard>
        {BANKS.map((bank) => (
          <ListRow
            key={bank.id}
            initial={bank.initial}
            title={bank.name}
            subtitle="Instant · read-only"
            amount="Connect"
            onClick={onConnect}
          />
        ))}
      </RowsCard>

      <div className="flex items-center gap-3 rounded-lg bg-safe-bg p-4 text-safe-fg">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface">
          <Icon name="lock" />
        </span>
        <p className="t-body-m">Your data is encrypted. You can disconnect at any time.</p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Button full onClick={onConnect}>
          Connect securely
        </Button>
        <Button full variant="ghost" onClick={onSkip}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}

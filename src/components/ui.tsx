"use client";

import type { ReactNode } from "react";

/* ---------- Icons (24px grid, stroke follows currentColor) ---------- */

export type IconName =
  | "shield"
  | "back"
  | "lock"
  | "arrow"
  | "check"
  | "send"
  | "gauge"
  | "download"
  | "checkCircle"
  | "chat";

const PATHS: Record<IconName, readonly string[]> = {
  shield: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"],
  back: ["M15 5l-7 7 7 7"],
  lock: ["M7 11V8a5 5 0 0110 0v3", "M5 11h14v9H5z"],
  arrow: ["M4 12h15", "M13 6l6 6-6 6"],
  check: ["M5 12l5 5 9-10"],
  send: ["M12 19V5", "M6 11l6-6 6 6"],
  gauge: ["M4 16a8 8 0 1116 0", "M12 16l4-5"],
  download: ["M12 4v11", "M7 11l5 5 5-5", "M5 20h14"],
  checkCircle: ["M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "M8 12l3 3 5-6"],
  chat: ["M4 5h16v11H9l-5 4z"],
};

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/* ---------- Button ---------- */

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "L" | "S";
  full?: boolean;
  disabled?: boolean;
};

export function Button({ children, onClick, variant = "primary", size = "L", full, disabled }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full transition active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100";
  const sizes = size === "L" ? "min-h-[54px] px-6 t-h3" : "min-h-[42px] px-4 t-label";
  const variants = {
    primary: "bg-action text-fg-inverse",
    secondary: "bg-surface text-fg border border-line",
    ghost: "bg-transparent text-fg",
  }[variant];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes} ${variants} ${full ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}

/* ---------- Status chip ---------- */

export function StatusChip({ tone, children }: { tone: "safe" | "warn" | "risk"; children: ReactNode }) {
  const tones = {
    safe: "bg-safe-bg text-safe-fg",
    warn: "bg-warn-bg text-warn-fg",
    risk: "bg-risk-bg text-risk-fg",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-[10px] py-1 t-caption ${tones}`}>{children}</span>;
}

/* ---------- List row ---------- */

type ListRowProps = {
  initial: string;
  title: string;
  subtitle: string;
  amount?: string;
  positive?: boolean;
  onClick?: () => void;
};

export function ListRow({ initial, title, subtitle, amount, positive, onClick }: ListRowProps) {
  const inner = (
    <>
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-muted t-label">{initial}</span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate t-label">{title}</span>
        <span className="block truncate t-caption text-fg-2">{subtitle}</span>
      </span>
      {amount ? <span className={`t-label ${positive ? "text-safe-fg" : "text-fg"}`}>{amount}</span> : null}
    </>
  );
  const cls = "flex w-full items-center gap-3 py-2";
  return onClick ? (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/* ---------- Surfaces ---------- */

export function RowsCard({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1 rounded-lg border border-line bg-surface px-4 py-2">{children}</div>;
}

export function ProgressBar({ value, trackClass, fillClass }: { value: number; trackClass: string; fillClass: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full ${trackClass}`}>
      <div
        className={`h-full rounded-full transition-[width] duration-700 ease-out ${fillClass}`}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface"
    >
      <Icon name="back" />
    </button>
  );
}

export function ScreenTitle({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="t-h1">{title}</h1>
      {right}
    </div>
  );
}

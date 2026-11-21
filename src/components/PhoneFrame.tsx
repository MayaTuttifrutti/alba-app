import type { ReactNode } from "react";

/**
 * On small screens the app fills the viewport.
 * From 640px up it sits inside a 375x812 phone frame, so a recruiter on a laptop sees the real proportions.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center sm:p-8">
      <div className="relative h-dvh w-full overflow-hidden bg-app sm:h-[812px] sm:max-h-[calc(100dvh-4rem)] sm:w-[375px] sm:rounded-[48px] sm:border-[10px] sm:border-[#0b0f1c] sm:shadow-[0_40px_80px_-20px_rgba(20,27,45,0.45)]">
        <div className="pointer-events-none absolute left-1/2 top-2 z-50 hidden h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-[#05070d] sm:block" />
        {children}
      </div>
    </div>
  );
}

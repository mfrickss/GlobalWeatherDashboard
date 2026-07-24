'use client';

import type { ReactNode } from 'react';

interface MetricTileProps {
  label: string;
  icon: ReactNode;
  value: string | number;
  unit: string;
}

export function MetricTile({ label, icon, value, unit }: MetricTileProps) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:border-white/[0.12]">
      <div className="mb-2 flex items-center gap-1.5 text-xs text-white/50">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-lg font-semibold tabular-nums text-white">
        {value}
        {unit && <span className="ml-0.5 text-xs text-white/40">{unit}</span>}
      </div>
    </div>
  );
}

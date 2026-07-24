'use client';

import { RefreshCw, Search } from 'lucide-react';
import type { TempUnit } from '@/types/ui';

interface DashboardHeaderProps {
  unit: TempUnit;
  search: string;
  refreshing: boolean;
  onUnitChange: (unit: TempUnit) => void;
  onSearchChange: (q: string) => void;
  onRefresh: () => void;
}

export function DashboardHeader({
  unit,
  search,
  refreshing,
  onUnitChange,
  onSearchChange,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Brand */}
      <div className="flex items-center gap-2.5 text-[15px] font-semibold tracking-wide text-white">
        <div className="h-2 w-2 rounded-full bg-[#7a9a92] shadow-[0_0_8px_rgba(122,154,146,0.4)]" />
        <span>the.weather</span>
      </div>

      {/* Search */}
      <div className="relative flex-1 md:max-w-[340px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Search cities, countries..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full rounded-xl border border-white/[0.08] bg-[#131d20]/60 pl-9 pr-4 text-sm text-white placeholder:text-white/40 backdrop-blur-md outline-none transition-all focus:border-white/[0.14] focus:shadow-[0_0_0_3px_rgba(122,154,146,0.15)]"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2.5">
        <div className="flex overflow-hidden rounded-lg border border-white/[0.08] bg-[#131d20]/60 backdrop-blur-md">
          <button
            type="button"
            onClick={() => onUnitChange('C')}
            className={`px-3 py-1.5 text-[13px] font-semibold transition-colors ${
              unit === 'C'
                ? 'bg-[rgba(122,154,146,0.2)] text-[#7a9a92]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            °C
          </button>
          <button
            type="button"
            onClick={() => onUnitChange('F')}
            className={`px-3 py-1.5 text-[13px] font-semibold transition-colors ${
              unit === 'F'
                ? 'bg-[rgba(122,154,146,0.2)] text-[#7a9a92]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            °F
          </button>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#131d20]/60 text-white/40 backdrop-blur-md transition-colors hover:text-white hover:border-white/[0.14] ${
            refreshing ? '[&>svg]:animate-spin' : ''
          }`}
          title="Refresh data"
        >
          <RefreshCw className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
          <span>Live</span>
        </div>
      </div>
    </div>
  );
}

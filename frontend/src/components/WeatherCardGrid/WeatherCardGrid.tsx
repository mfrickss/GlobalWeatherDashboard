'use client';

import type { CountryItem } from '@/types/country';
import type { TempUnit } from '@/types/ui';
import { WeatherCard } from '../WeatherCard';

interface WeatherCardGridProps {
  items: CountryItem[];
  unit: TempUnit;
  search: string;
  onSelect: (countryName: string) => void;
}

export function WeatherCardGrid({
  items,
  unit,
  search,
  onSelect,
}: WeatherCardGridProps) {
  if (items.length === 0) {
    return (
      <div className="mt-20 text-center text-sm text-white/30">
        No countries found matching "{search}"
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((country) => (
        <WeatherCard
          key={country.id}
          country={country}
          unit={unit}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}

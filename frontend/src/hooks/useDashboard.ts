'use client';

import { useCallback, useMemo, useState } from 'react';
import type { CountryItem } from '@/types/country';
import type { TempUnit } from '@/types/ui';

// Curated initial set of ~20 notable countries shown before any search.
// Uses ISO 3166-1 alpha-2 codes that match the backend /countries endpoint `id` field.
const FEATURED_IDS = new Set([
  'BR',
  'US',
  'JP',
  'GB',
  'FR',
  'DE',
  'AU',
  'AE',
  'SG',
  'RU',
  'IN',
  'CN',
  'MX',
  'CA',
  'AR',
  'NG',
  'ZA',
  'EG',
  'IT',
  'TR',
]);

export function useDashboard(allCountries: CountryItem[]) {
  const [unit, setUnit] = useState<TempUnit>('C');
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const displayedItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      // Show curated featured countries in their original sorted order
      return allCountries.filter((c) => FEATURED_IDS.has(c.id));
    }
    return allCountries.filter((c) => c.name.toLowerCase().includes(q));
  }, [allCountries, search]);

  const handleSelect = useCallback((countryName: string) => {
    setSelectedCountry(countryName);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  const handleUnitChange = useCallback((u: TempUnit) => {
    setUnit(u);
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearch(q);
  }, []);

  // Bumping refreshKey triggers useWeather to re-fetch in the modal.
  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return {
    unit,
    search,
    displayedItems,
    selectedCountry,
    refreshKey,
    handleSelect,
    handleClose,
    handleUnitChange,
    handleSearchChange,
    handleRefresh,
  };
}

'use client';

import { useEffect, useState } from 'react';
import { fetchCountries } from '@/services/countryService';
import type { CountryItem } from '@/types/country';

export function useCountries() {
  const [items, setItems] = useState<CountryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCountries()
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load countries.'))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading, error };
}

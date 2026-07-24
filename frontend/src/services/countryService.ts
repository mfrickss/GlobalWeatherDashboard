import countries from 'i18n-iso-countries';
import type { CountryItem } from '@/types/country';
import { getApiBaseUrl } from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/no-require-imports
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export function getAllIsoCountries(): CountryItem[] {
  const namesMap = countries.getNames('en');
  return Object.entries(namesMap)
    .map(([code, name]) => ({
      id: code,
      name: Array.isArray(name) ? name[0] : name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchCountries(): Promise<CountryItem[]> {
  const baseUrl = getApiBaseUrl();

  // 1. Try backend endpoint first
  try {
    const res = await fetch(`${baseUrl}/countries`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // Fall through if backend fetch fails
  }

  // 2. Return full 250 ISO countries list
  return getAllIsoCountries();
}

import type { CountryItem } from '@/types/country';
import { getApiBaseUrl } from '@/utils/api';
import { registerCountryCodes } from '@/utils/flags';

export async function fetchCountries(): Promise<CountryItem[]> {
  const baseUrl = getApiBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/countries`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        registerCountryCodes(json.data);
        return json.data;
      }
    }
  } catch {
    // Fall through if backend fetch fails
  }

  return [];
}

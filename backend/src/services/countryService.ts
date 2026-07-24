import countries from 'i18n-iso-countries';
import { cache } from '../config/cache';

export interface CountryItem {
  id: string;
  name: string;
}

export async function getCountries(): Promise<CountryItem[]> {
  const cacheKey = 'all_countries_iso';
  const cached = cache.get<CountryItem[]>(cacheKey);

  if (cached) return cached;

  const namesMap = countries.getNames('en');
  const countryList: CountryItem[] = Object.entries(namesMap)
    .map(([code, name]) => ({
      id: code,
      name: Array.isArray(name) ? name[0] : name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  cache.set(cacheKey, countryList, 86400);
  return countryList;
}

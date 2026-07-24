import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { cache } from '../config/cache';

countries.registerLocale(enLocale);

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
      name: name as string,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  cache.set(cacheKey, countryList, 86400);
  return countryList;
}

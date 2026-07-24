import type { CountryItem } from '@/types/country';

interface RestCountry {
  name: {
    common: string;
  };
  cca2: string;
}

export async function fetchCountries(): Promise<CountryItem[]> {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  const data: RestCountry[] = await response.json();

  return data
    .map((country) => ({
      id: country.cca2,
      name: country.name.common,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

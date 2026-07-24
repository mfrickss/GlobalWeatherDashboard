const nameToCodeCache = new Map<string, string>();

export function registerCountryCodes(
  countries: { id: string; name: string }[],
): void {
  for (const c of countries) {
    nameToCodeCache.set(c.name.toLowerCase(), c.id.toLowerCase());
  }
}

export function getCountryFlagUrl(countryNameOrCode: string): string | null {
  if (!countryNameOrCode) return null;

  const trimmed = countryNameOrCode.trim();
  if (trimmed.length === 2) {
    return `https://flagcdn.com/w40/${trimmed.toLowerCase()}.png`;
  }

  const cachedCode = nameToCodeCache.get(trimmed.toLowerCase());
  if (cachedCode) {
    return `https://flagcdn.com/w40/${cachedCode}.png`;
  }

  return null;
}

import type { WeatherType } from '@/types/ui';

export function toF(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

/**
 * Maps a WeatherAPI.com condition string to the internal WeatherType union.
 * Handles common condition text patterns returned by the API.
 */
export function conditionToType(condition: string): WeatherType {
  const lower = condition.toLowerCase();
  if (lower.includes('thunder') || lower.includes('lightning')) return 'storm';
  if (
    lower.includes('snow') ||
    lower.includes('blizzard') ||
    lower.includes('ice pellet') ||
    lower.includes('sleet')
  )
    return 'snow';
  if (
    lower.includes('rain') ||
    lower.includes('drizzle') ||
    lower.includes('mist') ||
    lower.includes('fog') ||
    lower.includes('freezing')
  )
    return 'rain';
  if (
    lower.includes('cloud') ||
    lower.includes('overcast') ||
    lower.includes('partly')
  )
    return 'cloud';
  return 'sun';
}

export function badgeClasses(type: WeatherType): string {
  switch (type) {
    case 'rain':
      return 'bg-sky-500/10 text-sky-300 border-sky-500/20';
    case 'cloud':
      return 'bg-slate-400/10 text-slate-300 border-slate-400/20';
    case 'sun':
      return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
    case 'storm':
      return 'bg-violet-500/10 text-violet-300 border-violet-500/20';
    case 'snow':
      return 'bg-cyan-200/10 text-cyan-200 border-cyan-200/20';
    default:
      return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
  }
}

'use client';

import { useEffect } from 'react';
import {
  Cloud,
  CloudLightning,
  CloudRain,
  Droplets,
  Snowflake,
  Sun,
} from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';
import type { CountryItem } from '@/types/country';
import type { TempUnit, WeatherType } from '@/types/ui';
import { getCountryFlagUrl } from '@/utils/flags';
import { badgeClasses, conditionToType } from '@/utils/weather';

interface WeatherCardProps {
  country: CountryItem;
  unit: TempUnit;
  onClick: (countryName: string) => void;
}

function WeatherIcon({
  type,
  className = 'w-5 h-5',
}: {
  type: WeatherType;
  className?: string;
}) {
  const props = { className, strokeWidth: 1.5 };
  switch (type) {
    case 'sun':
      return <Sun {...props} />;
    case 'cloud':
      return <Cloud {...props} />;
    case 'rain':
      return <CloudRain {...props} />;
    case 'storm':
      return <CloudLightning {...props} />;
    case 'snow':
      return <Snowflake {...props} />;
    default:
      return <Cloud {...props} />;
  }
}

export function WeatherCard({ country, unit, onClick }: WeatherCardProps) {
  const { weather, loading, loadWeather } = useWeather();
  const flagUrl = getCountryFlagUrl(country.id || country.name);

  useEffect(() => {
    loadWeather(country.name);
  }, [country.name, loadWeather]);

  const weatherType = weather ? conditionToType(weather.condition) : 'sun';
  const temp = weather
    ? unit === 'C'
      ? Math.round(weather.temperature_c)
      : Math.round(weather.temperature_f)
    : '--';

  return (
    <div
      onClick={() => onClick(country.name)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(country.name);
        }
      }}
      className="group relative cursor-pointer rounded-2xl border border-white/[0.08] bg-[#131d20]/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-[3px] hover:border-white/[0.14] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_0_1px_rgba(122,154,146,0.1)]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(122,154,146,0.06)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-5 w-7 items-center justify-center overflow-hidden rounded border border-white/[0.08] bg-white/[0.04] text-sm">
            {flagUrl ? (
              <img
                src={flagUrl}
                alt={`${country.name} flag`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>🏳️</span>
            )}
          </div>
          <div>
            <div className="text-[15px] font-semibold text-white">
              {country.name}
            </div>
            <div className="mt-0.5 text-xs text-white/45">{country.id}</div>
          </div>
        </div>
        <div className="text-white/40">
          <WeatherIcon type={weatherType} />
        </div>
      </div>

      <div className="relative mt-4 text-[36px] font-light leading-none tracking-tight text-white tabular-nums">
        {loading ? (
          <span className="text-2xl text-white/30">...</span>
        ) : (
          <>
            {temp}
            <span className="ml-0.5 align-super text-lg font-normal opacity-60">
              °{unit}
            </span>
          </>
        )}
      </div>

      <div className="relative mt-3.5 flex items-center justify-between border-t border-white/[0.08] pt-3.5">
        <div className="flex items-center gap-1.5 text-xs text-white/45">
          <Droplets className="h-3.5 w-3.5" />
          <span>{weather ? `${weather.humidity}%` : '--'}</span>
        </div>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badgeClasses(
            weatherType,
          )}`}
        >
          {weather ? weather.condition : 'Loading...'}
        </span>
      </div>
    </div>
  );
}

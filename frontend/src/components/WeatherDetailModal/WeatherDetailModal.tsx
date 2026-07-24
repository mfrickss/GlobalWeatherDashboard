'use client';

import { useEffect } from 'react';
import {
  Cloud,
  CloudLightning,
  CloudRain,
  Droplets,
  Eye,
  Gauge,
  Snowflake,
  Sun,
  SunDim,
  Thermometer,
  Wind,
  X,
} from 'lucide-react';
import type { WeatherData } from '@/types/weather';
import type { TempUnit, WeatherType } from '@/types/ui';
import { getCountryFlagUrl } from '@/utils/flags';
import { conditionToType } from '@/utils/weather';
import { MetricTile } from './MetricTile';
import { ForecastRow } from './ForecastRow';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

interface WeatherDetailModalProps {
  country: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  unit: TempUnit;
  onClose: () => void;
}

function WeatherIcon({
  type,
  className = 'h-5 w-5',
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

export function WeatherDetailModal({
  country,
  weather,
  loading,
  error,
  unit,
  onClose,
}: WeatherDetailModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const flagUrl = getCountryFlagUrl(country);
  const weatherType = weather ? conditionToType(weather.condition) : 'sun';

  const temp = weather
    ? unit === 'C'
      ? Math.round(weather.temperature_c)
      : Math.round(weather.temperature_f)
    : 0;

  const feelsLike = weather
    ? unit === 'C'
      ? Math.round(weather.feels_like_c)
      : Math.round(weather.feels_like_f)
    : 0;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const metrics = weather
    ? [
        {
          label: 'Cloudiness',
          icon: <Cloud className="h-3.5 w-3.5" />,
          value: weather.cloud ?? 0,
          unit: '%',
        },
        {
          label: 'Humidity',
          icon: <Droplets className="h-3.5 w-3.5" />,
          value: weather.humidity ?? 0,
          unit: '%',
        },
        {
          label: 'Wind Speed',
          icon: <Wind className="h-3.5 w-3.5" />,
          value: weather.wind_kph ?? 0,
          unit: 'km/h',
        },
        {
          label: 'Rain',
          icon: <CloudRain className="h-3.5 w-3.5" />,
          value: weather.precip_mm ?? 0,
          unit: 'mm',
        },
        {
          label: 'Feels Like',
          icon: <Thermometer className="h-3.5 w-3.5" />,
          value: feelsLike,
          unit: `°${unit}`,
        },
        {
          label: 'UV Index',
          icon: <SunDim className="h-3.5 w-3.5" />,
          value: weather.uv ?? 0,
          unit: '',
        },
        {
          label: 'Pressure',
          icon: <Gauge className="h-3.5 w-3.5" />,
          value: weather.pressure_mb ?? 1013,
          unit: 'hPa',
        },
        {
          label: 'Visibility',
          icon: <Eye className="h-3.5 w-3.5" />,
          value: weather.vis_km ?? 10,
          unit: 'km',
        },
      ]
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080e10]/75 p-5 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[720px] max-h-[90vh] flex-col overflow-hidden rounded-[18px] border border-white/[0.12] bg-[#19262a]/90 shadow-[0_24px_64px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-4 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero */}
        <div className="relative border-b border-white/[0.08] bg-gradient-to-b from-[rgba(25,38,42,0.9)] to-[rgba(19,29,32,0.95)] px-8 py-9 md:px-8">
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(122,154,146,0.3)] to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 text-white/60">
              <LoadingSpinner />
              <p className="mt-4 text-sm">Fetching latest weather data...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8 text-rose-400">
              <div className="text-3xl mb-2">⚠️</div>
              <p className="text-sm font-medium">{error}</p>
            </div>
          ) : weather ? (
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <div className="text-[56px] font-extralight leading-[0.9] tracking-tight text-white tabular-nums md:text-[72px]">
                  {temp}
                  <span className="ml-1 align-super text-2xl font-normal opacity-50 md:text-[28px]">
                    °{unit}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-xl font-semibold text-white md:text-[22px]">
                    {flagUrl && (
                      <img
                        src={flagUrl}
                        alt={`${country} flag`}
                        className="h-5 w-7 rounded object-cover border border-white/10"
                      />
                    )}
                    <span>
                      {weather.city}, {weather.country}
                    </span>
                  </div>
                  <div className="mt-1 text-[13px] text-white/50">
                    {timeStr} · {dateStr}
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#7a9a92]">
                    <WeatherIcon type={weatherType} className="h-4 w-4" />
                    <span>{weather.condition}</span>
                  </div>
                </div>
              </div>
              <div className="text-white/60">
                <WeatherIcon
                  type={weatherType}
                  className="h-14 w-14 md:h-16 md:w-16"
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Body */}
        {weather && !loading && !error && (
          <div className="overflow-y-auto px-6 py-6 md:px-8 md:pb-8">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Weather Details
            </div>
            <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {metrics.map((m) => (
                <MetricTile
                  key={m.label}
                  label={m.label}
                  icon={m.icon}
                  value={m.value}
                  unit={m.unit}
                />
              ))}
            </div>

            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Hourly Forecast
            </div>
            <ForecastRow
              currentTempC={weather.temperature_c}
              currentTempF={weather.temperature_f}
              unit={unit}
              weatherType={weatherType}
              forecast={weather.forecast}
            />
          </div>
        )}
      </div>
    </div>
  );
}

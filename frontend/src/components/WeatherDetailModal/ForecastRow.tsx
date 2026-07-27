'use client';

import { Cloud, CloudLightning, CloudRain, Snowflake, Sun } from 'lucide-react';
import type { TempUnit, WeatherType } from '@/types/ui';

interface ForecastRowProps {
  currentTempC: number;
  currentTempF: number;
  unit: TempUnit;
  weatherType: WeatherType;
  forecast?: {
    time: string;
    temp_c: number;
    temp_f: number;
    condition: string;
  }[];
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

export function ForecastRow({
  currentTempC,
  currentTempF,
  unit,
  weatherType,
  forecast,
}: ForecastRowProps) {
  const hasRealForecast = Array.isArray(forecast) && forecast.length > 0;
  const forecastHours = [
    'Now',
    '+1h',
    '+2h',
    '+3h',
    '+4h',
    '+5h',
    '+6h',
    '+7h',
  ];
  const baseTemp =
    unit === 'C' ? Math.round(currentTempC) : Math.round(currentTempF);
  const offsets = [0, 0, 1, 1, 2, 1, 0, -1];

  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2">
      {hasRealForecast
        ? forecast.map((item, i) => {
            const timeLabel = item.time
              ? item.time.split(' ')[1] || `+${i}h`
              : `+${i}h`;
            const itemTemp =
              unit === 'C' ? Math.round(item.temp_c) : Math.round(item.temp_f);
            return (
              <div
                key={item.time || i}
                className="flex min-w-[72px] flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center transition-colors hover:border-white/[0.12]"
              >
                <div className="mb-1.5 text-[11px] text-white/50">
                  {timeLabel}
                </div>
                <div className="mb-1.5 text-white/60">
                  <WeatherIcon type={weatherType} />
                </div>
                <div className="text-sm font-semibold tabular-nums text-white">
                  {itemTemp}°
                </div>
              </div>
            );
          })
        : forecastHours.map((hourLabel, i) => (
            <div
              key={hourLabel}
              className="flex min-w-[72px] flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center transition-colors hover:border-white/[0.12]"
            >
              <div className="mb-1.5 text-[11px] text-white/50">
                {hourLabel}
              </div>
              <div className="mb-1.5 text-white/60">
                <WeatherIcon type={weatherType} />
              </div>
              <div className="text-sm font-semibold tabular-nums text-white">
                {baseTemp + offsets[i]}°
              </div>
            </div>
          ))}
    </div>
  );
}

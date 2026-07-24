import { cache } from '../config/cache';
import { env } from '../config/env';
import type { WeatherData } from '../types/weather';

export async function getWeatherByCountry(
  country: string,
): Promise<WeatherData> {
  const cacheKey = country.toLowerCase();
  const cached = cache.get<WeatherData>(cacheKey);

  if (cached) return cached;

  try {
    const url = new URL(`${env.weatherApiBaseUrl}/forecast.json`);
    url.searchParams.set('key', env.weatherApiKey);
    url.searchParams.set('q', country);
    url.searchParams.set('days', '1');

    const res = await fetch(url.toString());

    if (!res.ok) {
      if (res.status === 400) {
        const notFound = new Error('COUNTRY_NOT_FOUND');
        notFound.name = 'COUNTRY_NOT_FOUND';
        throw notFound;
      }
      const apiError = new Error('WEATHER_API_UNAVAILABLE');
      apiError.name = 'WEATHER_API_UNAVAILABLE';
      throw apiError;
    }

    const data = (await res.json()) as any;

    const hourly = Array.isArray(data.forecast?.forecastday?.[0]?.hour)
      ? data.forecast.forecastday[0].hour.slice(0, 8).map((h: any) => ({
          time: h.time,
          temp_c: h.temp_c,
          temp_f: h.temp_f,
          condition: h.condition?.text || '',
        }))
      : [];

    const weather: WeatherData = {
      country: data.location.country,
      city: data.location.name,
      localtime: data.location.localtime,
      temperature_c: data.current.temp_c,
      temperature_f: data.current.temp_f,
      condition: data.current.condition.text,
      condition_icon: data.current.condition.icon.startsWith('http')
        ? data.current.condition.icon
        : `https:${data.current.condition.icon}`,
      feels_like_c: data.current.feelslike_c,
      feels_like_f: data.current.feelslike_f,
      humidity: data.current.humidity,
      wind_kph: data.current.wind_kph,
      precip_mm: data.current.precip_mm,
      cloud: data.current.cloud,
      uv: data.current.uv,
      pressure_mb: data.current.pressure_mb,
      vis_km: data.current.vis_km,
      forecast: hourly,
    };


    cache.set(cacheKey, weather);
    return weather;
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      (err.name === 'COUNTRY_NOT_FOUND' ||
        err.name === 'WEATHER_API_UNAVAILABLE')
    ) {
      throw err;
    }
    const apiError = new Error('WEATHER_API_UNAVAILABLE');
    apiError.name = 'WEATHER_API_UNAVAILABLE';
    throw apiError;
  }
}

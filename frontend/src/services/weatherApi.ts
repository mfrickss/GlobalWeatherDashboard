import type { ApiError, ApiResponse, WeatherData } from '@/types/weather';
import { getApiBaseUrl } from '@/utils/api';

const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const inflightRequests = new Map<string, Promise<WeatherData>>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchWeather(
  country: string,
  forceRefresh = false,
): Promise<WeatherData> {
  const cacheKey = country.trim().toLowerCase();
  const now = Date.now();

  if (!forceRefresh) {
    const cached = weatherCache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
  }

  const existingInflight = inflightRequests.get(cacheKey);
  if (existingInflight) {
    return existingInflight;
  }

  const promise = (async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(
        `${baseUrl}/weather/${encodeURIComponent(country)}`,
      );

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      if (!response.ok) {
        if (isJson) {
          const errorJson = (await response.json()) as ApiError;
          throw new Error(errorJson.message || `Error (${response.status})`);
        }
        throw new Error(`Servidor respondeu com status ${response.status}`);
      }

      if (!isJson) {
        throw new Error('Resposta inválida do servidor');
      }

      const json: ApiResponse<WeatherData> = await response.json();

      if (!json.success) {
        throw new Error(json.message);
      }

      weatherCache.set(cacheKey, { data: json.data, timestamp: Date.now() });
      return json.data;
    } finally {
      inflightRequests.delete(cacheKey);
    }
  })();

  inflightRequests.set(cacheKey, promise);
  return promise;
}


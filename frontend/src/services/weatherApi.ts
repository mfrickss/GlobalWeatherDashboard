import type { ApiError, ApiResponse, WeatherData } from '@/types/weather';
import { getApiBaseUrl } from '@/utils/api';

export async function fetchWeather(country: string): Promise<WeatherData> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/weather/${encodeURIComponent(country)}`);

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

  return json.data;
}

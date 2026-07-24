import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cache } from '../../config/cache';
import { getWeatherByCountry } from '../../services/weatherService';

describe('weatherService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    cache.flushAll();
  });

  it('retorna dados para país válido', async () => {
    const mockApiResponse = {
      location: {
        country: 'Brasil',
        name: 'São Paulo',
        localtime: '2024-01-01 12:00',
      },
      current: {
        temp_c: 28,
        temp_f: 82.4,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        },
        feelslike_c: 30,
        feelslike_f: 86.0,
        humidity: 60,
        wind_kph: 10,
        precip_mm: 0,
        cloud: 10,
        uv: 5,
        pressure_mb: 1013,
        vis_km: 10,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockApiResponse,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getWeatherByCountry('Brasil');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      country: 'Brasil',
      city: 'São Paulo',
      localtime: '2024-01-01 12:00',
      temperature_c: 28,
      temperature_f: 82.4,
      condition: 'Sunny',
      condition_icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
      feels_like_c: 30,
      feels_like_f: 86.0,
      humidity: 60,
      wind_kph: 10,
      precip_mm: 0,
      cloud: 10,
      uv: 5,
      pressure_mb: 1013,
      vis_km: 10,
      forecast: [],
    });
  });

  it('lança COUNTRY_NOT_FOUND para país inválido', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        error: { code: 1006, message: 'No location found' },
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getWeatherByCountry('InvalidCountry')).rejects.toThrow(
      'COUNTRY_NOT_FOUND',
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

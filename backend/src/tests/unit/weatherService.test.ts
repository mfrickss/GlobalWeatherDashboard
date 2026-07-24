import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cache } from '../../config/cache';
import { getWeatherByCountry } from '../../services/weatherService';

vi.mock('axios');

describe('weatherService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    if (typeof cache.flushAll === 'function') {
      cache.flushAll();
    }
  });

  it('retorna dados para país válido', async () => {
    const mockApiResponse = {
      data: {
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
        },
      },
    };

    vi.mocked(axios.get).mockResolvedValue(mockApiResponse);

    const result = await getWeatherByCountry('Brasil');

    expect(axios.get).toHaveBeenCalledTimes(1);
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
    });
  });

  it('lança COUNTRY_NOT_FOUND para país inválido', async () => {
    const error: any = new Error('Axios Error mocked');
    error.response = { status: 400 };

    vi.mocked(axios.isAxiosError).mockReturnValue(true);
    vi.mocked(axios.get).mockRejectedValue(error);

    await expect(getWeatherByCountry('InvalidCountry')).rejects.toThrow(
      'COUNTRY_NOT_FOUND',
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

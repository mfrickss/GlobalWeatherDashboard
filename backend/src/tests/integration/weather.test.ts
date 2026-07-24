import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import app from '../../app';
import * as weatherService from '../../services/weatherService';

vi.mock('../../services/weatherService');

describe('GET /weather/:country', () => {
  it('retorna 200 com dados de clima', async () => {
    vi.mocked(weatherService.getWeatherByCountry).mockResolvedValue({
      country: 'Brazil',
      city: 'São Paulo',
      localtime: '2024-01-01 12:00',
      temperature_c: 28,
      temperature_f: 82.4,
      condition: 'Sunny',
      condition_icon: 'https://example.com/icon.png',
      feels_like_c: 30,
      feels_like_f: 80.4,
      humidity: 65,
      wind_kph: 12,
      precip_mm: 0,
      cloud: 20,
      uv: 6,
      pressure_mb: 1014,
      vis_km: 10,
    });

    const res = await request(app).get('/weather/Brazil');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.country).toBe('Brazil');
  });

  it('retorna 404 para país inválido', async () => {
    const err = new Error('COUNTRY_NOT_FOUND');
    err.name = 'COUNTRY_NOT_FOUND';
    vi.mocked(weatherService.getWeatherByCountry).mockRejectedValue(err);

    const res = await request(app).get('/weather/InvalidCountry');
    expect(res.status).toBe(404);
    expect(res.body.code).toBe('COUNTRY_NOT_FOUND');
  });
});

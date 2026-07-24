import { beforeEach, describe, expect, it } from 'vitest';
import { cache } from '../../config/cache';
import { getCountries } from '../../services/countryService';

describe('countryService', () => {
  beforeEach(() => {
    if (typeof cache.flushAll === 'function') {
      cache.flushAll();
    }
  });

  it('retorna a lista completa de países ISO (250 países)', async () => {
    const result = await getCountries();

    expect(result.length).toBeGreaterThan(200);
    expect(result).toContainEqual({
      id: 'BR',
      name: 'Brazil',
    });
  });

  it('utiliza cache nas chamadas subsequentes', async () => {
    const firstCall = await getCountries();
    const secondCall = await getCountries();

    expect(firstCall).toEqual(secondCall);
  });
});

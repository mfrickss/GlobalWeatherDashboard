import type { NextFunction, Request, Response } from 'express';
import { getCountries } from '../services/countryService';
import type { ApiResponse } from '../types/weather';
import type { CountryItem } from '../services/countryService';

export async function countryController(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const countries = await getCountries();
    const body: ApiResponse<CountryItem[]> = { success: true, data: countries };
    res.status(200).json(body);
  } catch (err) {
    next(err);
  }
}

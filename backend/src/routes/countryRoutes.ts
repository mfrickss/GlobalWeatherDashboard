import { Router } from 'express';
import { countryController } from '../controllers/countryController';

export const countryRouter = Router();

countryRouter.get('/', countryController);

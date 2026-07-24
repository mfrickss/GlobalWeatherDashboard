import express from 'express';
import { corsMiddleware } from './middlewares/cors';
import { errorHandler } from './middlewares/errorHandler';
import { weatherRouter } from './routes/weatherRoutes';
import { countryRouter } from './routes/countryRoutes';

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use('/weather', weatherRouter);
app.use('/countries', countryRouter);

app.use(errorHandler);

export default app;

import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { countryRouter } from './routes/countryRoutes';
import { weatherRouter } from './routes/weatherRoutes';

const app = express();

const corsOrigin = env.allowedOrigins.includes('*') ? '*' : env.allowedOrigins;

app.use(express.json());
app.use(cors({ origin: corsOrigin, methods: ['GET', 'OPTIONS'] }));


// Direct routes
app.use('/weather', weatherRouter);
app.use('/countries', countryRouter);

// Vercel proxy / serverless routes
app.use('/api/backend/weather', weatherRouter);
app.use('/api/backend/countries', countryRouter);

app.use(errorHandler);

export default app;


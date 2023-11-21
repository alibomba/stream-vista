import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import productionRoutes from './routes/productionRoutes';
import categoryRoutes from './routes/categoryRoutes';
import trackRoutes from './routes/trackRoutes';
import watchListRoutes from './routes/watchListRoutes';
import seriesRoutes from './routes/seriesRoutes';
import movieRoutes from './routes/movieRoutes';

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/storage', express.static(`${__dirname}/public`));
app.use('/api', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', newsletterRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', productionRoutes);
app.use('/api', categoryRoutes);
app.use('/api', trackRoutes);
app.use('/api', watchListRoutes);
app.use('/api', seriesRoutes);
app.use('/api', movieRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


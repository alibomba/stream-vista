import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import newsletterRoutes from './routes/newsletterRoutes';

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/storage', express.static(`${__dirname}/public`));
app.use('/api', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', newsletterRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


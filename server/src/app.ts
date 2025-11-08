import express, { Application, Request, Response } from 'express';
import corsConfig from './config/cors.config';
import authRoutes from './routes/auth.routes';

const app: Application = express();

app.use(corsConfig);
app.use(express.json());

/* Importacion de Rutas */
app.use('/api/auth', authRoutes); // Rutas de Autenticacion

// Example route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

export default app;
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { requestLogger } from './app/libs/logger';
import { requestTime } from './app/middlewares/requestTime';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(requestLogger); // loger
app.use(requestTime) // Inject Request Time

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

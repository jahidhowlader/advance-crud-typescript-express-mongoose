import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { requestLogger } from './app/libs/logger';
import { requestTime } from './app/middlewares/requestTime';

const app: Application = express();

// loger
app.use(requestLogger);
// Inject Request Time
app.use(requestTime)

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

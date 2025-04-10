import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser'
import { requestLogger } from './app/libs/logger';
import { requestTime } from './app/middlewares/requestTime';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routers';

const app: Application = express();

app.use(requestLogger); // logger
app.use(requestTime) // Inject Request Time

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173']
}));

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(notFoundHandler);

app.use(globalErrorHandler)

export default app;

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { requestLogger } from './app/libs/logger';
import { requestTime } from './app/middlewares/requestTime';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routers';

const app: Application = express();

// Middleware to handle timeout
const timeoutMiddleware = (req, res, next) => {
  // Set a timer for 2 seconds
  const timer = setTimeout(() => {
    res.status(408).send('Request Timeout'); // 408 is the status code for timeout
  }, 2000); // Timeout after 2 seconds

  // Reset the timer when a response is sent
  res.on('finish', () => {
    clearTimeout(timer);
  });

  next(); // Move to the next middleware/handler
};

app.use(timeoutMiddleware);

app.use(requestLogger); // loger
app.use(requestTime) // Inject Request Time

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/some-endpoint', (req, res) => {
  // Simulate some delay (you can replace this with actual logic)
  setTimeout(() => {
    res.send('This is the response after delay');
  }, 3000); // Delay of 3 seconds (greater than timeout)
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(notFoundHandler);

app.use(globalErrorHandler)

export default app;

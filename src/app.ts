import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  req.startTime = Date.now()
  next()
})

// application routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

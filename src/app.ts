import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/global.ErrorHandler';
import notFound from './app/middlewares/notFound';
import { router } from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
  //  const a = 10;
  // res.send(a);
};

app.use('/', test);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Error-handling middleware
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;

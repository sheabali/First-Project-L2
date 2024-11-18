import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();
const port = 3000;

//parsers

app.use(express.json());
app.use(cors());

const d2 = 1;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());

export default app;

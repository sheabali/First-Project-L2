import express, { NextFunction, Request, Response } from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

const shenaBahini = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  next();
};

router.get('/', StudentControllers.getAllStudent);

router.get('/:studentId', shenaBahini, StudentControllers.getSingleStudent);

export const StudentRoutes = router;

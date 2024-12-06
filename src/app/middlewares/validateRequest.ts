import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //validate check

    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export default validateRequest;

import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.status || 500; // Use a valid status code, default to 500
  const message = err.message || 'Something went wrong'; // Properly handle message

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;

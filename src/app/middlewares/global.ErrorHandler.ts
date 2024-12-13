import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  let errorSource: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    console.log('ami mongoose er validation error');
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;

import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorRespons } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorRespons => {
  const errorSources: TErrorSources = [
    {
      path: err.name,
      message: err.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID.',
    errorSources,
  };
};

export default handleCastError;

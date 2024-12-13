import { TErrorSources, TGenericErrorRespons } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorRespons => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1]; // Fallback message if extraction fails

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists.`,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID.',
    errorSources,
  };
};

export default handleDuplicateError;

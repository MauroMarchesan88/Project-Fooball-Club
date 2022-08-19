import { NextFunction, Request, Response } from 'express';
import HttpError from './httpErrorClass';

function errorCode(name: string) {
  let code = 0;
  switch (name) {
    case 'ValidationError':
      code = 400;
      break;
    default:
      code = 500;
      break;
  }
  return code;
}

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err as HttpError;
  const status = errorCode(name);

  return res.status(status || 500).json({ message });
};

export default errorMiddleware;

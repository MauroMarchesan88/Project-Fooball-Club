import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = async (err, _req, res, next) => {
  const { status, name, message } = err;

  if (name === 'JsonWebTokenError') {
    res.status(401).json({ message: 'Token must be a valid token' });
    return next();
  }
  res.status(status || 500).json({ message });

  next();
};

export default errorMiddleware;

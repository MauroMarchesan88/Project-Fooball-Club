import { sign, SignOptions, verify } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const options: SignOptions = {
  algorithm: 'HS256',
};

export const createToken = (email: string, password: string) => {
  const token = sign({ email, password }, SECRET, options);
  return token;
};

export const validateToken = (token: string) => {
  const userData = verify(token, SECRET, options);
  return userData as { email: string, password: string, role: string };
};

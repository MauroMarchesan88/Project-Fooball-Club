import { sign, SignOptions, verify } from 'jsonwebtoken';

const options: SignOptions = {
  algorithm: 'HS256',
};

export const createToken = (email: string, password: string) => {
  const token = sign({ email, password }, 'my_super_secret', options);
  return token;
};

export const validateToken = (token: string) => {
  const userData = verify(token, 'my_super_secret', options);
  return userData as { username: string };
};

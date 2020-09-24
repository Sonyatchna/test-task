import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export function generateToken({ email, _id }: { email: string, _id: string }) {
  return jwt.sign(
    { email, _id },
    config.secret,
    { expiresIn: config.tokenExpireMin + 'm' }
  );
};

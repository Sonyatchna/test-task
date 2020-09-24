import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export function generateRefreshToken({ email, _id }: { email: string, _id: string }) {
  return jwt.sign(
    { email, _id },
    config.refreshSecret,
    { expiresIn: config.refreshTokenExpireMin + 'm' }
  );
}

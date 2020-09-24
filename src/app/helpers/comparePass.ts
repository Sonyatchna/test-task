import bcrypt from 'bcryptjs';
import Unauthorized from '../errors/Unauthorized';

export function comparePassword(password: string, hashedPassword: string) {
  try {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err: Error, result: any) => {
        if (err) reject(err.message);
        resolve(result);
      });
    })
  } catch (err) {
    throw new Unauthorized('Not correct password.');
  }
}

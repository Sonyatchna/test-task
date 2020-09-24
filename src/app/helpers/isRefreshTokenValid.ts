import { config } from '../config/config';
const jwt = require('jsonwebtoken');
import NotValidToken from '../errors/NotValidToken';

export function isRefreshTokenValid(token: string) {
  return jwt.verify(token, config.refreshSecret, (err: Error, decoded: any) => {
    if(err){
      throw new NotValidToken();
    }
    return decoded;
  });
}

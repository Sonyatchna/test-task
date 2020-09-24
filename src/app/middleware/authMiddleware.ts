import { Context, Next } from 'koa';
import Unauthorized from '../errors/Unauthorized';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import BlacklistService from '../services/BlacklistService';
import NotValidToken from '../errors/NotValidToken';

export async function authMiddleware(ctx: Context, next: Next) {
  let accessToken: string | undefined = ctx.request.headers["x-access-token"] as string || ctx.request.headers["authorization"] as string;
  if (!accessToken) throw new Unauthorized('Access denied. No token provided.');
  if (accessToken.startsWith('JWT ')) accessToken = accessToken.split(' ')[1];
  if (await BlacklistService.isTokenInBlacklist(accessToken)) {
    throw new NotValidToken();
  }
  ctx.state.authUser = jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (err) throw new NotValidToken();
    return decoded;
  });
  await next();
}

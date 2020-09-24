import bodyParser from 'koa-bodyparser';
import initRoutes from '../routes';
import errorHandlerMiddleware from '../middleware/errorHandler';
import Koa from 'koa';
import BlacklistService from '../services/BlacklistService';
import { config } from '../config/config';
require('dotenv').config();

export async function appBootstrap(): Promise<Koa> {
  const app: Koa = new Koa();

  app.use(errorHandlerMiddleware);
  app.use(bodyParser());

  const router = initRoutes();
  app.use(router.routes()).use(router.allowedMethods());

  setInterval(BlacklistService.clearBlacklist, config.refreshTokenExpireMin * 1000 * 60);

  return app;
}

import { Context, Next } from 'koa';

export default async function errorHandlerMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    const errorBody = {
      message: err.message,
      statusCode: err.code || 500
    };
    ctx.response.status = errorBody.statusCode;
    ctx.body = errorBody;
  }
};

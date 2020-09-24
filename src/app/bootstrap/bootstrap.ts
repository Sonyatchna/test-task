import Koa from 'koa';
import { appBootstrap } from './appBootstrap';
import { databaseBootstrap } from './databaseBootstrap';

export async function bootstrap(): Promise<void> {
  const app: Koa = await appBootstrap();
  await databaseBootstrap();

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

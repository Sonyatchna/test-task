import Router from 'koa-router';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import { authMiddleware } from './middleware/authMiddleware';

const router = new Router();

export default function initRoutes() {
  router.post('/auth/login', AuthController.loginUser);
  router.post('/auth/register', AuthController.registerUser);
  router.post('/auth/refresh', AuthController.refresh);
  router.post('/auth/logout', authMiddleware, AuthController.logout);

  router.get('/users', authMiddleware, UserController.getAllUsers);
  router.get('/users/:id', authMiddleware, UserController.getUserById);
  router.patch('/users/:id', authMiddleware, UserController.updateUserById);
  router.delete('/users/:id', authMiddleware, UserController.deleteUserById);

  return router;
}

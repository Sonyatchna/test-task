import { Context } from 'koa';
import UserRepository from '../repositories/UserRepository';
import { checkValidMongooseId } from '../helpers/mongooseCheckValidId';
import NotValidMongooseId from '../errors/NotValidMongooseId';
import { UserDocument } from '../interfaces/UserInterface';
import { UserAdapter } from './adapters/UserAdapter';

export default class UserController {

  static async getAllUsers(ctx: Context): Promise<void> {
    const query = ctx.request.query;
    const users: UserDocument[] = await UserRepository.findAll(query);
    ctx.response.status = 200;
    ctx.body = users.map(user => UserAdapter.entityToResponse(user));
  }

  static async getUserById(ctx: Context): Promise<void> {
    if (!checkValidMongooseId(ctx.params.id)) {
      throw new NotValidMongooseId();
    }
    const user: UserDocument = await UserRepository.findById(ctx.params.id);
    ctx.response.status = 200;
    ctx.body = UserAdapter.entityToResponse(user);
  }

  static async deleteUserById(ctx: Context): Promise<void> {
    if (!checkValidMongooseId(ctx.params.id)) {
      throw new NotValidMongooseId();
    }
    await UserRepository.deleteById(ctx.params.id);
    ctx.response.status = 204;
  }

  static async updateUserById(ctx: Context): Promise<void> {
    if (!checkValidMongooseId(ctx.params.id)) {
      throw new NotValidMongooseId();
    }
    const user = await UserRepository.updateById(ctx.params.id, ctx.request.body);
    ctx.response.status = 200;
    ctx.body = UserAdapter.entityToResponse(user);
  }
};

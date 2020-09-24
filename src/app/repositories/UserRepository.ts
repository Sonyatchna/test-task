import UserModel from '../models/UserModel';
import EntityNotFound from '../errors/EntityNotFound';
import ValidationError from '../errors/ValidationError';
import { UserDocument, UserInterface } from '../interfaces/UserInterface';
import { hashPassword } from '../helpers/cryptoHelper';

export default class UserRepository {

  static async save(body: UserInterface): Promise<UserDocument> {
    if (body?.password?.length < 8 || body?.password?.length > 24) {
      throw new ValidationError('Password is not valid!');
    }
    const user: UserDocument = new UserModel(body);
    await hashPassword(user);
    const errors = user.validateSync();
    if (errors) {
      throw errors;
    }
    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === 11000) {
        throw new ValidationError('Email already exists!');
      } else{
        throw err;
      }
    }
  }

  static async findAll(query: object): Promise<UserDocument[]> {
    return await UserModel.find(query);
  }

  static async findById(id: string): Promise<UserDocument> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new EntityNotFound(`User with id - ${id} does not exist`);
    }
    return user;
  }

  static async deleteById(id: string): Promise<UserDocument | null> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new EntityNotFound(`User with id - ${id} does not exist`);
    }
    return user.remove();
  }

  static async updateById(id: string, body: UserInterface): Promise<UserDocument> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, body, { new: true });
    if (!updatedUser) {
      throw new EntityNotFound(`User with id - ${id} does not exist`);
    }
    return updatedUser;
  }
};

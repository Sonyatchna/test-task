import { Context } from 'koa';
import UserRepository from '../repositories/UserRepository';
import { comparePassword } from '../helpers/comparePass';
import { generateToken } from '../helpers/generateToken';
import { UserDocument, UserInterface } from '../interfaces/UserInterface';
import { generateRefreshToken } from '../helpers/generateRefreshToken';
import { isRefreshTokenValid } from '../helpers/isRefreshTokenValid';
import NotValidToken from '../errors/NotValidToken';
import BlacklistService from '../services/BlacklistService';
import UnexpectedError from '../errors/UnexpectedError';
import EntityNotFound from '../errors/EntityNotFound';
import BadRequest from '../errors/BadRequest';
import { AuthAdapter } from './adapters/AuthAdapter';
import { UserAdapter } from './adapters/UserAdapter';

export default class AuthController {

  static async loginUser(ctx: Context): Promise<void> {
    const userBody: UserInterface = ctx.request.body;
    const users: UserDocument[] = await UserRepository.findAll({email: userBody.email});

    if (users.length !== 1) {
      throw new EntityNotFound('User does not exists.');
    }

    const user: UserDocument = users[0];

    if (!await comparePassword(userBody.password, user.password)) {
      throw new BadRequest('Not correct password.');
    }

    if (!user.accessToken || !user.refreshToken) {
      throw new UnexpectedError('Access or refresh token does not exist!');
    }

    await BlacklistService.addTokenToBlacklist(user.accessToken);
    const newAccessToken: string = generateToken({email: user.email, _id: user._id});

    await BlacklistService.addTokenToBlacklist(user.refreshToken);
    const newRefreshToken: string = generateRefreshToken({email: user.email, _id: user._id});

    ctx.response.status = 200;
    ctx.body = await AuthAdapter.dataToAuthResponse(user, newAccessToken, newRefreshToken);
  }

  static async registerUser(ctx: Context): Promise<void> {
    const userBody: UserInterface = ctx.request.body;
    const user = await UserRepository.save(userBody);
    ctx.response.status = 200;
    ctx.body = UserAdapter.entityToResponse(user);
  }

  static async refresh(ctx: Context): Promise<void> {
    const refreshToken: string = ctx.query.refreshToken;

    if (await BlacklistService.isTokenInBlacklist(refreshToken)) {
      throw new NotValidToken();
    }

    const refreshDecoded = isRefreshTokenValid(refreshToken);

    if (!refreshDecoded) {
      throw new NotValidToken();
    }

    const userId: string = refreshDecoded._id;
    const user = await UserRepository.findById(userId);

    if (!user.accessToken) {
      throw new UnexpectedError('Access token does not exist!');
    }

    const accessToken: string = user.accessToken;

    await BlacklistService.addTokenToBlacklist(accessToken);
    const newAccessToken: string = generateToken({email: refreshDecoded.email, _id: refreshDecoded._id});

    await BlacklistService.addTokenToBlacklist(refreshToken);
    const newRefreshToken: string = generateRefreshToken({email: refreshDecoded.email, _id: refreshDecoded._id});

    ctx.response.status = 200;
    ctx.body = await AuthAdapter.dataToAuthResponse(user, newAccessToken, newRefreshToken);
  }

  static async logout(ctx: Context) {
    const authUser = ctx.state.authUser;

    const user = await UserRepository.findById(authUser._id);

    if (user.accessToken) {
      await BlacklistService.addTokenToBlacklist(user.accessToken);
      user.accessToken = undefined;
    }

    if (user.refreshToken) {
      await BlacklistService.addTokenToBlacklist(user.refreshToken);
      user.refreshToken = undefined;
    }

    await UserRepository.updateById(user._id, user);

    ctx.response.status = 200;
    ctx.response.message = 'Successful logout!';
  }

};

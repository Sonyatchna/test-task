import { UserDocument } from '../../interfaces/UserInterface';
import { AuthResponse } from '../../interfaces/AuthResponse';
import UserRepository from '../../repositories/UserRepository';

export class AuthAdapter {
  static async dataToAuthResponse(user: UserDocument, accessToken: string, refreshToken: string): Promise<AuthResponse> {
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await UserRepository.updateById(user._id, user);
    return {
      message: 'success',
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }
}

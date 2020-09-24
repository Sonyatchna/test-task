import { UserDocument } from '../../interfaces/UserInterface';
import { UserResponse } from '../../interfaces/UserResponse';

export class UserAdapter {
  static entityToResponse(user: UserDocument): UserResponse {
    return {
      _id: user._id,
      email: user.email
    }
  }
}

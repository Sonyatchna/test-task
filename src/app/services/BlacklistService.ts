import { TokenBlacklistDocument, TokenBlacklistInterface } from '../interfaces/TokenBlacklistInterface';
import TokenBlacklistModel from '../models/TokenBlacklistModel';

export default class BlacklistService {

  static async isTokenInBlacklist(token: string): Promise<boolean> {
    if (await TokenBlacklistModel.findOne({token})) return true;
    else return false;
  }

  static async addTokenToBlacklist(token: string): Promise<TokenBlacklistDocument> {
    const tokenDoc: TokenBlacklistDocument = new TokenBlacklistModel({ token });
    await tokenDoc.save();
    return tokenDoc;
  }

  static async removeTokenFromBlacklist(body: TokenBlacklistInterface): Promise<TokenBlacklistDocument | null> {
    return TokenBlacklistModel.findOneAndRemove();
  }

  static async clearBlacklist() {
    return await TokenBlacklistModel.deleteMany({});
  }
}

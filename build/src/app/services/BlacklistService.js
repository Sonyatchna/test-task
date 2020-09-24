"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenBlacklistModel_1 = __importDefault(require("../models/TokenBlacklistModel"));
class BlacklistService {
    static async isTokenInBlacklist(token) {
        if (await TokenBlacklistModel_1.default.findOne({ token }))
            return true;
        else
            return false;
    }
    static async addTokenToBlacklist(token) {
        const tokenDoc = new TokenBlacklistModel_1.default({ token });
        await tokenDoc.save();
        return tokenDoc;
    }
    static async removeTokenFromBlacklist(body) {
        return TokenBlacklistModel_1.default.findOneAndRemove();
    }
    static async clearBlacklist() {
        return await TokenBlacklistModel_1.default.deleteMany({});
    }
}
exports.default = BlacklistService;

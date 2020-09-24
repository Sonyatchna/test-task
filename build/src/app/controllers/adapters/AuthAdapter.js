"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdapter = void 0;
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
class AuthAdapter {
    static async dataToAuthResponse(user, accessToken, refreshToken) {
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await UserRepository_1.default.updateById(user._id, user);
        return {
            message: 'success',
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }
}
exports.AuthAdapter = AuthAdapter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const comparePass_1 = require("../helpers/comparePass");
const generateToken_1 = require("../helpers/generateToken");
const generateRefreshToken_1 = require("../helpers/generateRefreshToken");
const isRefreshTokenValid_1 = require("../helpers/isRefreshTokenValid");
const NotValidToken_1 = __importDefault(require("../errors/NotValidToken"));
const BlacklistService_1 = __importDefault(require("../services/BlacklistService"));
const UnexpectedError_1 = __importDefault(require("../errors/UnexpectedError"));
const EntityNotFound_1 = __importDefault(require("../errors/EntityNotFound"));
const BadRequest_1 = __importDefault(require("../errors/BadRequest"));
const AuthAdapter_1 = require("./adapters/AuthAdapter");
const UserAdapter_1 = require("./adapters/UserAdapter");
class AuthController {
    static async loginUser(ctx) {
        const userBody = ctx.request.body;
        const users = await UserRepository_1.default.findAll({ email: userBody.email });
        if (users.length !== 1) {
            throw new EntityNotFound_1.default('User does not exists.');
        }
        const user = users[0];
        if (!await comparePass_1.comparePassword(userBody.password, user.password)) {
            throw new BadRequest_1.default('Not correct password.');
        }
        if (!user.accessToken || !user.refreshToken) {
            throw new UnexpectedError_1.default('Access or refresh token does not exist!');
        }
        await BlacklistService_1.default.addTokenToBlacklist(user.accessToken);
        const newAccessToken = generateToken_1.generateToken({ email: user.email, _id: user._id });
        await BlacklistService_1.default.addTokenToBlacklist(user.refreshToken);
        const newRefreshToken = generateRefreshToken_1.generateRefreshToken({ email: user.email, _id: user._id });
        ctx.response.status = 200;
        ctx.body = await AuthAdapter_1.AuthAdapter.dataToAuthResponse(user, newAccessToken, newRefreshToken);
    }
    static async registerUser(ctx) {
        const userBody = ctx.request.body;
        const user = await UserRepository_1.default.save(userBody);
        ctx.response.status = 200;
        ctx.body = UserAdapter_1.UserAdapter.entityToResponse(user);
    }
    static async refresh(ctx) {
        const refreshToken = ctx.query.refreshToken;
        if (await BlacklistService_1.default.isTokenInBlacklist(refreshToken)) {
            throw new NotValidToken_1.default();
        }
        const refreshDecoded = isRefreshTokenValid_1.isRefreshTokenValid(refreshToken);
        if (!refreshDecoded) {
            throw new NotValidToken_1.default();
        }
        const userId = refreshDecoded._id;
        const user = await UserRepository_1.default.findById(userId);
        if (!user.accessToken) {
            throw new UnexpectedError_1.default('Access token does not exist!');
        }
        const accessToken = user.accessToken;
        await BlacklistService_1.default.addTokenToBlacklist(accessToken);
        const newAccessToken = generateToken_1.generateToken({ email: refreshDecoded.email, _id: refreshDecoded._id });
        await BlacklistService_1.default.addTokenToBlacklist(refreshToken);
        const newRefreshToken = generateRefreshToken_1.generateRefreshToken({ email: refreshDecoded.email, _id: refreshDecoded._id });
        ctx.response.status = 200;
        ctx.body = await AuthAdapter_1.AuthAdapter.dataToAuthResponse(user, newAccessToken, newRefreshToken);
    }
    static async logout(ctx) {
        const authUser = ctx.state.authUser;
        const user = await UserRepository_1.default.findById(authUser._id);
        if (user.accessToken) {
            await BlacklistService_1.default.addTokenToBlacklist(user.accessToken);
            user.accessToken = undefined;
        }
        if (user.refreshToken) {
            await BlacklistService_1.default.addTokenToBlacklist(user.refreshToken);
            user.refreshToken = undefined;
        }
        await UserRepository_1.default.updateById(user._id, user);
        ctx.response.status = 200;
        ctx.response.message = 'Successful logout!';
    }
}
exports.default = AuthController;
;

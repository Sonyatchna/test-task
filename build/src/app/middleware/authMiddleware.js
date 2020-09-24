"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const Unauthorized_1 = __importDefault(require("../errors/Unauthorized"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const BlacklistService_1 = __importDefault(require("../services/BlacklistService"));
const NotValidToken_1 = __importDefault(require("../errors/NotValidToken"));
async function authMiddleware(ctx, next) {
    let accessToken = ctx.request.headers["x-access-token"] || ctx.request.headers["authorization"];
    if (!accessToken)
        throw new Unauthorized_1.default('Access denied. No token provided.');
    if (accessToken.startsWith('JWT '))
        accessToken = accessToken.split(' ')[1];
    if (await BlacklistService_1.default.isTokenInBlacklist(accessToken)) {
        throw new NotValidToken_1.default();
    }
    ctx.state.authUser = jsonwebtoken_1.default.verify(accessToken, config_1.config.secret, (err, decoded) => {
        if (err)
            throw new NotValidToken_1.default();
        return decoded;
    });
    await next();
}
exports.authMiddleware = authMiddleware;

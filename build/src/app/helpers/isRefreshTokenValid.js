"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRefreshTokenValid = void 0;
const config_1 = require("../config/config");
const jwt = require('jsonwebtoken');
const NotValidToken_1 = __importDefault(require("../errors/NotValidToken"));
function isRefreshTokenValid(token) {
    return jwt.verify(token, config_1.config.refreshSecret, (err, decoded) => {
        if (err) {
            throw new NotValidToken_1.default();
        }
        return decoded;
    });
}
exports.isRefreshTokenValid = isRefreshTokenValid;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
function generateToken({ email, _id }) {
    return jsonwebtoken_1.default.sign({ email, _id }, config_1.config.secret, { expiresIn: config_1.config.tokenExpireMin + 'm' });
}
exports.generateToken = generateToken;
;

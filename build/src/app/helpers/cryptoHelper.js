"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
function hashPassword(user) {
    return new Promise((resolve, reject) => {
        bcryptjs_1.default.hash(user.password, saltRounds, (err, hash) => {
            if (err)
                reject(err.message);
            user.password = hash;
            resolve();
        });
    });
}
exports.hashPassword = hashPassword;

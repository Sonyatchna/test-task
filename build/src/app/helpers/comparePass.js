"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Unauthorized_1 = __importDefault(require("../errors/Unauthorized"));
function comparePassword(password, hashedPassword) {
    try {
        return new Promise((resolve, reject) => {
            bcryptjs_1.default.compare(password, hashedPassword, (err, result) => {
                if (err)
                    reject(err.message);
                resolve(result);
            });
        });
    }
    catch (err) {
        throw new Unauthorized_1.default('Not correct password.');
    }
}
exports.comparePassword = comparePassword;

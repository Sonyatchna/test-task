"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../models/UserModel"));
const EntityNotFound_1 = __importDefault(require("../errors/EntityNotFound"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const cryptoHelper_1 = require("../helpers/cryptoHelper");
class UserRepository {
    static async save(body) {
        var _a, _b;
        if (((_a = body === null || body === void 0 ? void 0 : body.password) === null || _a === void 0 ? void 0 : _a.length) < 8 || ((_b = body === null || body === void 0 ? void 0 : body.password) === null || _b === void 0 ? void 0 : _b.length) > 24) {
            throw new ValidationError_1.default('Password is not valid!');
        }
        const user = new UserModel_1.default(body);
        await cryptoHelper_1.hashPassword(user);
        const errors = user.validateSync();
        if (errors) {
            throw errors;
        }
        try {
            await user.save();
            return user;
        }
        catch (err) {
            if (err.code === 11000) {
                throw new ValidationError_1.default('Email already exists!');
            }
            else {
                throw err;
            }
        }
    }
    static async findAll(query) {
        return await UserModel_1.default.find(query);
    }
    static async findById(id) {
        const user = await UserModel_1.default.findById(id);
        if (!user) {
            throw new EntityNotFound_1.default(`User with id - ${id} does not exist`);
        }
        return user;
    }
    static async deleteById(id) {
        const user = await UserModel_1.default.findById(id);
        if (!user) {
            throw new EntityNotFound_1.default(`User with id - ${id} does not exist`);
        }
        return user.remove();
    }
    static async updateById(id, body) {
        const updatedUser = await UserModel_1.default.findByIdAndUpdate(id, body, { new: true });
        if (!updatedUser) {
            throw new EntityNotFound_1.default(`User with id - ${id} does not exist`);
        }
        return updatedUser;
    }
}
exports.default = UserRepository;
;

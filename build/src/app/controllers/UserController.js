"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const mongooseCheckValidId_1 = require("../helpers/mongooseCheckValidId");
const NotValidMongooseId_1 = __importDefault(require("../errors/NotValidMongooseId"));
const UserAdapter_1 = require("./adapters/UserAdapter");
class UserController {
    static async getAllUsers(ctx) {
        const query = ctx.request.query;
        const users = await UserRepository_1.default.findAll(query);
        ctx.response.status = 200;
        ctx.body = users.map(user => UserAdapter_1.UserAdapter.entityToResponse(user));
    }
    static async getUserById(ctx) {
        if (!mongooseCheckValidId_1.checkValidMongooseId(ctx.params.id)) {
            throw new NotValidMongooseId_1.default();
        }
        const user = await UserRepository_1.default.findById(ctx.params.id);
        ctx.response.status = 200;
        ctx.body = UserAdapter_1.UserAdapter.entityToResponse(user);
    }
    static async deleteUserById(ctx) {
        if (!mongooseCheckValidId_1.checkValidMongooseId(ctx.params.id)) {
            throw new NotValidMongooseId_1.default();
        }
        await UserRepository_1.default.deleteById(ctx.params.id);
        ctx.response.status = 204;
    }
    static async updateUserById(ctx) {
        if (!mongooseCheckValidId_1.checkValidMongooseId(ctx.params.id)) {
            throw new NotValidMongooseId_1.default();
        }
        const user = await UserRepository_1.default.updateById(ctx.params.id, ctx.request.body);
        ctx.response.status = 200;
        ctx.body = UserAdapter_1.UserAdapter.entityToResponse(user);
    }
}
exports.default = UserController;
;

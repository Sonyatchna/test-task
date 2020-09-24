"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const router = new koa_router_1.default();
function initRoutes() {
    router.post('/auth/login', AuthController_1.default.loginUser);
    router.post('/auth/register', AuthController_1.default.registerUser);
    router.post('/auth/refresh', AuthController_1.default.refresh);
    router.post('/auth/logout', authMiddleware_1.authMiddleware, AuthController_1.default.logout);
    router.get('/users', authMiddleware_1.authMiddleware, UserController_1.default.getAllUsers);
    router.get('/users/:id', authMiddleware_1.authMiddleware, UserController_1.default.getUserById);
    router.patch('/users/:id', authMiddleware_1.authMiddleware, UserController_1.default.updateUserById);
    router.delete('/users/:id', authMiddleware_1.authMiddleware, UserController_1.default.deleteUserById);
    return router;
}
exports.default = initRoutes;

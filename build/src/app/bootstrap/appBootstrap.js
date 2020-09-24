"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appBootstrap = void 0;
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const routes_1 = __importDefault(require("../routes"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
const koa_1 = __importDefault(require("koa"));
const BlacklistService_1 = __importDefault(require("../services/BlacklistService"));
const config_1 = require("../config/config");
require('dotenv').config();
async function appBootstrap() {
    const app = new koa_1.default();
    app.use(errorHandler_1.default);
    app.use(koa_bodyparser_1.default());
    const router = routes_1.default();
    app.use(router.routes()).use(router.allowedMethods());
    setInterval(BlacklistService_1.default.clearBlacklist, config_1.config.refreshTokenExpireMin * 1000 * 60);
    return app;
}
exports.appBootstrap = appBootstrap;

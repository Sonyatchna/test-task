"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    secret: process.env.SECRET || 'hcetofnippaodotkcabsj',
    refreshSecret: process.env.REFRESH_SECRET || 'jgmenhivobgdkslslvvflfbjfpbkrnspwnv',
    tokenExpireMin: Number(process.env.TOKEN_EXPIRES_MIN) || 60,
    refreshTokenExpireMin: Number(process.env.REFRESH_TOKEN_EXPIRES_MIN) || 10080
};

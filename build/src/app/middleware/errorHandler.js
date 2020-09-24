"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function errorHandlerMiddleware(ctx, next) {
    try {
        await next();
    }
    catch (err) {
        const errorBody = {
            message: err.message,
            statusCode: err.code || 500
        };
        ctx.response.status = errorBody.statusCode;
        ctx.body = errorBody;
    }
}
exports.default = errorHandlerMiddleware;
;

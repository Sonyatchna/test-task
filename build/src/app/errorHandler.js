"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlerMiddleware(err, req, res, next) {
    const errorBody = {
        message: err.message,
        statusCode: err.code || 500
    };
    res.status(errorBody.statusCode).send(errorBody);
}
exports.default = errorHandlerMiddleware;
;

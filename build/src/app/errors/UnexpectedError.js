"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class UnexpectedError extends Error {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.INTERNAL_SERVER_ERROR;
    }
}
exports.default = UnexpectedError;
;

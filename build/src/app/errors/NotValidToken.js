"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class NotValidToken extends Error {
    constructor() {
        super();
        this.code = http_status_codes_1.BAD_REQUEST;
        this.message = 'Invalid token';
    }
}
exports.default = NotValidToken;
;

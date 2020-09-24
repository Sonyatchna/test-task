"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class Unauthorized extends Error {
    constructor(message) {
        super();
        this.code = http_status_codes_1.UNAUTHORIZED;
        this.message = message || 'User is not authorized.';
    }
}
exports.default = Unauthorized;
;

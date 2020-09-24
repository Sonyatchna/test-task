"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class Forbidden extends Error {
    constructor(message) {
        super();
        this.code = http_status_codes_1.FORBIDDEN;
        this.message = message || 'User has no permissions.';
    }
}
exports.default = Forbidden;
;

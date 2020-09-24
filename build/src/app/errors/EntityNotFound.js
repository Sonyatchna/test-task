"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class EntityNotFound extends Error {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.NOT_FOUND;
    }
}
exports.default = EntityNotFound;
;

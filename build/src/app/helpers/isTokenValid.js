"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const jwt = require('jsonwebtoken');
exports.default = (token) => {
    return jwt.verify(token, config_1.config.secret, (err, decoded) => {
        if (err) {
            return false;
        }
        return {
            success: true,
            decoded
        };
    });
};

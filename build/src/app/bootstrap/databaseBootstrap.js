"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseBootstrap = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const mongoose_1 = __importDefault(require("mongoose"));
async function databaseBootstrap() {
    await mongoose_1.default.connect(databaseConfig_1.databaseConfig.connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
}
exports.databaseBootstrap = databaseBootstrap;

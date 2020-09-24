"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("./bootstrap/bootstrap");
bootstrap_1.bootstrap().catch((err) => {
    console.error(err.message, err);
    process.exit(1);
});

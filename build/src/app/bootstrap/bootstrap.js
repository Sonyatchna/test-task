"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const appBootstrap_1 = require("./appBootstrap");
const databaseBootstrap_1 = require("./databaseBootstrap");
async function bootstrap() {
    const app = await appBootstrap_1.appBootstrap();
    await databaseBootstrap_1.databaseBootstrap();
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}
exports.bootstrap = bootstrap;

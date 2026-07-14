"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// prisma.config.ts
var path_1 = require("path");
var config_1 = require("prisma/config");
var dotenv = require("dotenv");
dotenv.config({ path: path_1.default.resolve(__dirname, '.env') }); // ← chemin explicite
exports.default = (0, config_1.defineConfig)({
    schema: './prisma/schema.prisma',
});

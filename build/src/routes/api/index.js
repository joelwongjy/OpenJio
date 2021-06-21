"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("./users"));
const jios_1 = __importDefault(require("./jios"));
const routes = express_1.Router();
routes.use("/auth", auth_1.default);
routes.use("/users", users_1.default);
routes.use("/jios", jios_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map
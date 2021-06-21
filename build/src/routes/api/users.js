"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UsersController = __importStar(require("../../controllers/UsersController"));
const checkBearerToken_1 = require("../../middlewares/checkBearerToken");
const tokens_1 = require("../../types/tokens");
exports.router = express_1.Router();
exports.router.post("/", UsersController.create);
exports.router.use(checkBearerToken_1.checkBearerToken(tokens_1.BearerTokenType.AccessToken));
exports.router.get("/self", UsersController.showSelf);
exports.router.patch("/self", UsersController.updateSelf);
exports.router.patch("/change_password", UsersController.changePassword);
exports.default = exports.router;
//# sourceMappingURL=users.js.map
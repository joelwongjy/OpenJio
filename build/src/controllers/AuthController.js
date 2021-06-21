"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
function login(request, response) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Try to login using username and password
            const username = request.body.username;
            const password = request.body.password;
            const user = yield typeorm_1.getRepository(User_1.User)
                .createQueryBuilder("user")
                .addSelect("user.password")
                .where("user.username = :username", { username })
                .andWhere("user.discardedAt is null")
                .getOne();
            if (!user || !user.password || !bcryptjs_1.compareSync(password, user.password)) {
                throw new Error("Invalid login credentials!");
            }
            const data = user.createAuthenticationToken();
            response.status(200).json(data);
            return;
        }
        catch (error) {
            response.status(400).json({
                error: (_a = error.message) !== null && _a !== void 0 ? _a : "Something went wrong. Please try again!",
            });
        }
    });
}
exports.login = login;
//# sourceMappingURL=AuthController.js.map
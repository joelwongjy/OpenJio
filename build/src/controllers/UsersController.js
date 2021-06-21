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
exports.changePassword = exports.updateSelf = exports.showSelf = exports.create = void 0;
const bcryptjs_1 = require("bcryptjs");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
function create(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, username, email, password, confirmPassword } = lodash_1.pick(request.body, "name", "username", "email", "password", "confirmPassword");
        const user = new User_1.User(name, username, email, password, confirmPassword);
        const errors = yield class_validator_1.validate(user);
        if (errors.length > 0) {
            console.log(errors);
            let error = "Something went wrong. Please try again!";
            errors.forEach((e) => {
                if (e.property && e.property === "username") {
                    error = "Username already exists!";
                }
                if (e.property && e.property === "confirmPassword") {
                    error = "Passwords do not match.";
                }
            });
            response.status(400).json({ error });
            return;
        }
        yield typeorm_1.getRepository(User_1.User).save(user);
        const data = Object.assign({ user: user.getData() }, user.createAuthenticationToken());
        response.status(201).json(data);
    });
}
exports.create = create;
function showSelf(_request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = response.locals.payload;
        const { userId } = payload;
        let user;
        try {
            user = yield typeorm_1.getRepository(User_1.User).findOneOrFail(userId, {
                where: { discardedAt: typeorm_1.IsNull() },
            });
        }
        catch (error) {
            response.sendStatus(404);
            return;
        }
        try {
            const data = user.getData();
            response.status(200).json({ user: data });
        }
        catch (error) {
            response.sendStatus(400);
        }
    });
}
exports.showSelf = showSelf;
function updateSelf(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = response.locals.payload;
        const { userId } = payload;
        let user;
        try {
            user = yield typeorm_1.getRepository(User_1.User).findOneOrFail(userId, {
                where: { discardedAt: typeorm_1.IsNull() },
            });
        }
        catch (error) {
            response.sendStatus(404);
            return;
        }
        try {
            Object.assign(user, lodash_1.pick(request.body, "name"));
            yield typeorm_1.getRepository(User_1.User).save(user);
            const data = user.getData();
            response.status(200).json({ user: data });
        }
        catch (error) {
            response.sendStatus(400);
        }
    });
}
exports.updateSelf = updateSelf;
function changePassword(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = response.locals.payload;
        const { userId } = payload;
        const oldPasswordB64 = request.body.oldPassword;
        const newPasswordB64 = request.body.newPassword;
        if (typeof oldPasswordB64 !== "string" ||
            typeof newPasswordB64 !== "string") {
            response.sendStatus(400);
            return;
        }
        const oldPassword = Buffer.from(oldPasswordB64, "base64").toString();
        const newPassword = Buffer.from(newPasswordB64, "base64").toString();
        const repo = typeorm_1.getRepository(User_1.User);
        const user = yield repo
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.id = :userId", { userId })
            .getOne();
        if (!user || !user.password || !bcryptjs_1.compareSync(oldPassword, user.password)) {
            response.sendStatus(400);
            return;
        }
        try {
            user.password = newPassword;
            yield class_validator_1.validateOrReject(user);
            yield repo.update(userId, { password: bcryptjs_1.hashSync(newPassword) });
            response.sendStatus(204);
        }
        catch (error) {
            response.sendStatus(400);
        }
    });
}
exports.changePassword = changePassword;
//# sourceMappingURL=UsersController.js.map
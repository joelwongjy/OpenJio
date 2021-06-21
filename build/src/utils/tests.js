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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFixtures = exports.Fixtures = exports.synchronize = void 0;
const faker_1 = __importDefault(require("faker"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
faker_1.default.seed(127);
function synchronize(apiServer) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!apiServer.connection) {
            throw new Error("Connection failed to initialise");
        }
        yield apiServer.connection.synchronize(true);
    });
}
exports.synchronize = synchronize;
class Fixtures {
    // Not instantiated
    // Empty for now
    constructor(user) {
        this.api = "/v1";
        this.faker = faker_1.default;
        this.user = user;
        this.userAccessToken = `Bearer ${user.createAuthenticationToken().accessToken}`;
    }
}
exports.Fixtures = Fixtures;
function loadFixtures(_apiServer) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [];
        const user = new User_1.User("admin", "Admin", "test@gmail.com", "setMeUp?", "setMeUp?");
        users.push(user);
        yield typeorm_1.getRepository(User_1.User).save(users);
        return new Fixtures(user);
    });
}
exports.loadFixtures = loadFixtures;
//# sourceMappingURL=tests.js.map
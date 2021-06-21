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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
const tests_1 = require("../utils/tests");
let server;
let fixtures;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    server = new server_1.ApiServer();
    yield server.initialize();
    yield tests_1.synchronize(server);
    fixtures = yield tests_1.loadFixtures(server);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield server.close();
}));
describe("GET /users/self", () => {
    it("should allow a User to get his own data", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server.server)
            .get(`${fixtures.api}/users/self`)
            .set("Authorization", fixtures.userAccessToken)
            .send();
        expect(response.status).toEqual(200);
    }));
});
describe("PATCH /users/self", () => {
    it("should allow a User to edit his own data", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server.server)
            .patch(`${fixtures.api}/users/self`)
            .set("Authorization", fixtures.userAccessToken)
            .send();
        expect(response.status).toEqual(200);
    }));
});
//# sourceMappingURL=users.spec.js.map
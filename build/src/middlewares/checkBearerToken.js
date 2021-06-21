"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBearerToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokens_1 = require("../types/tokens");
const checkBearerToken = (type) => (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !tokens_1.isBearerToken(bearerToken)) {
        res.sendStatus(401);
        return;
    }
    const token = bearerToken.split(" ")[1];
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        res.sendStatus(401);
        return;
    }
    switch (type) {
        case tokens_1.BearerTokenType.AccessToken:
            if (!tokens_1.isAccessTokenSignedPayload(payload)) {
                res.sendStatus(401);
                return;
            }
            break;
        default:
            res.sendStatus(401);
            return;
    }
    res.locals.payload = payload;
    next();
};
exports.checkBearerToken = checkBearerToken;
//# sourceMappingURL=checkBearerToken.js.map
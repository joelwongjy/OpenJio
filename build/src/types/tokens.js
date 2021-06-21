"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccessTokenSignedPayload = exports.isAccessTokenPayload = exports.isBearerToken = exports.BearerTokenType = void 0;
var BearerTokenType;
(function (BearerTokenType) {
    BearerTokenType[BearerTokenType["AccessToken"] = 0] = "AccessToken";
})(BearerTokenType = exports.BearerTokenType || (exports.BearerTokenType = {}));
// Type checkers
function isBearerToken(token) {
    if (!token) {
        return false;
    }
    const words = token.split(" ");
    return words[0] === "Bearer" && !!words[1];
}
exports.isBearerToken = isBearerToken;
function isPayload(payload, tokenType) {
    return (payload.tokenType in BearerTokenType && payload.tokenType === tokenType);
}
function hasTokenLifespan(payload) {
    return typeof payload.iat === "number" && typeof payload.exp === "number";
}
function isAccessTokenPayload(payload) {
    return (typeof payload.userId === "number" &&
        isPayload(payload, BearerTokenType.AccessToken));
}
exports.isAccessTokenPayload = isAccessTokenPayload;
function isAccessTokenSignedPayload(payload) {
    return isAccessTokenPayload(payload) && hasTokenLifespan(payload);
}
exports.isAccessTokenSignedPayload = isAccessTokenSignedPayload;
//# sourceMappingURL=tokens.js.map
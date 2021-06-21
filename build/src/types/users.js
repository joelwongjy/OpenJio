"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserData = exports.isUserListData = void 0;
const entities_1 = require("./entities");
function isUserListData(data) {
    return (typeof data.username === "string" &&
        typeof data.name === "string" &&
        entities_1.isDiscardableData(data));
}
exports.isUserListData = isUserListData;
function isUserData(data) {
    return isUserListData(data);
}
exports.isUserData = isUserData;
//# sourceMappingURL=users.js.map
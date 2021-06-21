"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDiscardableData = exports.isBaseData = exports.isValidDate = void 0;
// Do not use object instanceof Date
// See https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
function isValidDate(date) {
    // API calls returns JSON. JSON cannot contain a Date
    // So, convert the string to a Date before testing it.
    if (typeof date === "string") {
        date = new Date(date);
    }
    return (date &&
        Object.prototype.toString.call(date) === "[object Date]" &&
        !isNaN(date));
}
exports.isValidDate = isValidDate;
function isBaseData(data) {
    return (typeof data.id === "number" &&
        isValidDate(data.createdAt) &&
        isValidDate(data.updatedAt));
}
exports.isBaseData = isBaseData;
function isDiscardableData(data) {
    return ((data.discardedAt === null || isValidDate(data.discardedAt)) &&
        isBaseData(data));
}
exports.isDiscardableData = isDiscardableData;
//# sourceMappingURL=entities.js.map
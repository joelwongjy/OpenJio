"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectDiscardableData = exports.selectBaseData = void 0;
// TODO: Inject directly into QueryBuilder so we dont need to use HOC
function selectBaseData(queryBuilder, entityName) {
    return queryBuilder
        .select(`${entityName}.id`, "id")
        .addSelect(`${entityName}.createdAt`, "createdAt")
        .addSelect(`${entityName}.updatedAt`, "updatedAt");
}
exports.selectBaseData = selectBaseData;
function selectDiscardableData(queryBuilder, entityName, includeDiscarded = false) {
    const query = selectBaseData(queryBuilder, entityName).addSelect(`${entityName}.discardedAt`, "discardedAt");
    if (!includeDiscarded) {
        return query.where(`${entityName}.discardedAt IS NULL`);
    }
    return query;
}
exports.selectDiscardableData = selectDiscardableData;
//# sourceMappingURL=base.js.map
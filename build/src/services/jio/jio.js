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
exports.OrderDeletor = exports.JioDeleter = exports.OrderEditor = exports.JioEditor = exports.JioCreator = exports.JioGetter = void 0;
const class_validator_1 = require("class-validator");
const Item_1 = require("../../entities/Item");
const Jio_1 = require("../../entities/Jio");
const Order_1 = require("../../entities/Order");
const User_1 = require("../../entities/User");
const errors_1 = require("../../types/errors");
const typeorm_1 = require("typeorm");
const lodash_1 = require("lodash");
class JioCreatorError extends Error {
    constructor(message) {
        super(message);
        this.name = errors_1.JIO_CREATOR_ERROR;
    }
}
class JioEditorError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = errors_1.JIO_EDITOR_ERROR;
    }
}
class OrderEditorError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = errors_1.ORDER_EDITOR_ERROR;
    }
}
class JioGetter {
    getJios(jioIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const jios = jioIds.length === 0
                ? []
                : yield typeorm_1.getRepository(Jio_1.Jio).find({
                    where: jioIds.map((id) => {
                        return { id };
                    }),
                });
            return jios;
        });
    }
    getUserOpenJios(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const joinedJiosQuery = yield typeorm_1.getRepository(Jio_1.Jio).find({
                where: {
                    closeAt: typeorm_1.MoreThan(new Date()),
                },
                relations: ["orders"],
            });
            const joined = joinedJiosQuery.map((j) => {
                return Object.assign(Object.assign({}, j.getBase()), { name: j.name, createdAt: j.createdAt, closeAt: j.closeAt, username: j.user.username, orderLimit: j.orderLimit, orderCount: j.orders.length });
            });
            const openedJiosQuery = yield typeorm_1.getRepository(Jio_1.Jio).find({
                where: {
                    closeAt: typeorm_1.MoreThan(new Date()),
                    user: {
                        id: userId,
                    },
                },
                relations: ["orders"],
            });
            const opened = openedJiosQuery.map((j) => {
                return Object.assign(Object.assign({}, j.getBase()), { name: j.name, createdAt: j.createdAt, closeAt: j.closeAt, username: j.user.username, orderLimit: j.orderLimit, orderCount: j.orders.length });
            });
            return { joined, opened };
        });
    }
    getJio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const jio = yield typeorm_1.getRepository(Jio_1.Jio).findOne({
                where: { id },
                relations: ["orders"],
            });
            if (!jio) {
                return undefined;
            }
            const orders = yield Promise.all(jio.orders.map((order) => order.getListData()));
            const result = Object.assign(Object.assign({}, jio.getBase()), { name: jio.name, createdAt: jio.createdAt, closeAt: jio.closeAt, username: jio.user.username, orderLimit: jio.orderLimit, orderCount: jio.orders.length, orders, paymentNumber: jio.paymentNumber });
            return result;
        });
    }
}
exports.JioGetter = JioGetter;
class JioCreator {
    createJio(createData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, closeAt, paymentNumber, user, orderLimit } = createData;
            let jio = new Jio_1.Jio(name, closeAt, paymentNumber, user, orderLimit);
            const errors = yield class_validator_1.validate(jio);
            if (errors.length > 0) {
                throw new JioCreatorError(`Provided Jio details (name: ${name}, closeAt: ${closeAt}) ` +
                    `failed validation checks (failed properties: ${errors.map((e) => e.property)})`);
            }
            jio = yield typeorm_1.getRepository(Jio_1.Jio).save(jio);
            return jio;
        });
    }
}
exports.JioCreator = JioCreator;
class JioEditor {
    editJio(id, editData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield typeorm_1.getRepository(Jio_1.Jio).findOneOrFail({
                where: { id },
                relations: ["orders"],
            });
            const { name, closeAt, paymentNumber, orderLimit, orders } = editData;
            let jio;
            jio = yield this.editJioAttributes(query, name, closeAt, paymentNumber, orderLimit);
            if (orders) {
                jio = yield this.editAssociatedOrders(query, {
                    orders,
                });
            }
            return jio;
        });
    }
    editJioAttributes(jio, name, closeAt, paymentNumber, orderLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name && !closeAt && !paymentNumber && !orderLimit) {
                return jio;
            }
            if (name) {
                jio.name = name;
            }
            if (closeAt) {
                jio.closeAt = closeAt;
            }
            if (paymentNumber) {
                jio.paymentNumber = paymentNumber;
            }
            if (orderLimit) {
                jio.orderLimit = orderLimit;
            }
            yield typeorm_1.getRepository(Jio_1.Jio).save(jio);
            return jio;
        });
    }
    editAssociatedOrders(jio, editData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orders: existingOrders } = jio;
            const orderMap = new Map();
            existingOrders.forEach((order) => {
                orderMap.set(order.id, order);
            });
            const toKeep = [];
            const toCreate = [];
            const toDelete = [];
            editData.orders.forEach((order) => __awaiter(this, void 0, void 0, function* () {
                if (order.id && orderMap.has(order.id)) {
                    const orderInMap = orderMap.get(order.id);
                    toKeep.push(orderInMap);
                    orderMap.delete(order.id);
                    return;
                }
                const { userId } = order;
                const user = yield typeorm_1.getRepository(User_1.User).findOneOrFail({
                    where: { userId },
                });
                if (!userId) {
                    throw new JioEditorError(`Could not create new order as no userId was given`);
                }
                toCreate.push(new Order_1.Order(user, jio));
            }));
            orderMap.forEach((order) => {
                toDelete.push(order);
            });
            const keptOrders = yield this.keepOrders(toKeep);
            const createdOrders = yield this.createOrders(toCreate);
            const deletedOrders = yield this.deleteOrders(toDelete);
            const associatedOrders = [
                ...keptOrders,
                ...createdOrders,
                ...deletedOrders,
            ];
            if (associatedOrders.length < jio.orders.length) {
                throw new JioEditorError(`Edit operation will cause dangling orders`);
            }
            jio.orders = associatedOrders;
            yield typeorm_1.getRepository(Jio_1.Jio).save(jio);
            return jio;
        });
    }
    createOrders(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(orders.map((order) => __awaiter(this, void 0, void 0, function* () {
                const errors = yield class_validator_1.validate(order);
                if (errors.length > 0) {
                    throw new JioEditorError(`${order} failed validation checks ` +
                        `(failed properties: ${errors.map((e) => e.property)})`);
                }
            })));
            const newOrders = yield typeorm_1.getRepository(Order_1.Order).save(orders);
            return newOrders;
        });
    }
    deleteOrders(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletor = new OrderDeletor();
            return yield deletor.deleteOrders(orders);
        });
    }
    keepOrders(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            const toRestore = [];
            const toKeep = [];
            orders.forEach((order) => {
                if (order.discardedAt) {
                    toRestore.push(order);
                }
                else {
                    toKeep.push(order);
                }
            });
            const recoveredOrders = yield typeorm_1.getRepository(Order_1.Order).recover(toRestore);
            const result = toKeep.concat(recoveredOrders);
            return result;
        });
    }
}
exports.JioEditor = JioEditor;
class OrderEditor {
    editOrder(id, editData) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield typeorm_1.getRepository(Order_1.Order).findOne({
                where: { id },
                relations: ["items"],
            });
            if (!order) {
                throw new OrderEditorError(`No class found for id ${id}`);
            }
            const { paid, items } = editData;
            if (paid !== undefined) {
                order.paid = paid;
            }
            const itemMap = new Map();
            order.items.forEach((item) => {
                itemMap.set(item.id, item);
            });
            const toKeep = [];
            const toDelete = [];
            let toCreate = [];
            if (items) {
                items.forEach((item) => {
                    if (item.id && itemMap.has(item.id)) {
                        const i = itemMap.get(item.id);
                        toKeep.push(i);
                        itemMap.delete(item.id);
                    }
                    const { name, quantity, cost } = item;
                    if (!name || !quantity) {
                        throw new JioEditorError(`Could not create new item as no name or quantity were given`);
                    }
                    toCreate.push(new Item_1.Item(name, quantity));
                });
            }
            itemMap.forEach((item) => {
                toDelete.push(item);
            });
            // save
            yield typeorm_1.getRepository(Item_1.Item).save(toKeep);
            yield typeorm_1.getRepository(Item_1.Item).softRemove(toDelete);
            yield typeorm_1.getRepository(Item_1.Item).save(toCreate);
            const prevCount = order.items.length;
            order.items = [...toKeep, ...toDelete, ...toCreate];
            if (order.items.length < prevCount) {
                throw new OrderEditorError(`Implementation bug: will cause dangling Item`);
            }
            yield typeorm_1.getRepository(Order_1.Order).save(order);
            return order;
        });
    }
}
exports.OrderEditor = OrderEditor;
class JioDeleter {
    deleteJio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const jio = yield typeorm_1.getRepository(Jio_1.Jio).findOneOrFail({
                where: { id },
                relations: ["orders"],
            });
            const { orders } = jio;
            yield this._deleteJio(jio);
            const orderDeletor = new OrderDeletor();
            yield orderDeletor.deleteOrders(orders);
        });
    }
    _deleteJio(jio) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getRepository(Jio_1.Jio).softRemove(jio);
        });
    }
}
exports.JioDeleter = JioDeleter;
class OrderDeletor {
    deleteOrders(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            if (orders.length === 0) {
                return [];
            }
            const ordersOR = orders.map((order) => {
                return { id: order.id };
            });
            const queryOrders = yield typeorm_1.getRepository(Order_1.Order).find({
                where: ordersOR,
                relations: ["items"],
                withDeleted: true,
            });
            const items = lodash_1.flatMap(queryOrders.map((order) => order.items));
            const result = yield this._deleteOrders(queryOrders);
            yield this._deleteItems(items);
            return result;
        });
    }
    _deleteOrders(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getRepository(Order_1.Order).softRemove(orders);
        });
    }
    _deleteItems(items) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getRepository(Item_1.Item).softRemove(items);
        });
    }
}
exports.OrderDeletor = OrderDeletor;
//# sourceMappingURL=jio.js.map
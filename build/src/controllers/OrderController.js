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
exports.edit = exports.show = void 0;
const Order_1 = require("../entities/Order");
const typeorm_1 = require("typeorm");
const errors_1 = require("../types/errors");
const jio_1 = require("../services/jio");
function show(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const idInt = parseInt(id);
            if (!idInt) {
                response.status(400);
                return;
            }
            const order = yield typeorm_1.getRepository(Order_1.Order).findOne({
                where: { id: idInt },
                relations: ["items"],
            });
            if (!order) {
                response.sendStatus(404);
                return;
            }
            const data = yield order.getData();
            response.status(200).json(data);
            return;
        }
        catch (error) {
            console.log(error);
            response.status(400);
            return;
        }
    });
}
exports.show = show;
function edit(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        const editData = request.body;
        try {
            const idInt = parseInt(id);
            if (!idInt) {
                response.status(400);
                return;
            }
            const order = yield new jio_1.OrderEditor().editOrder(idInt, editData);
            response.status(200).json({ success: true, id: order.id });
        }
        catch (e) {
            switch (e.name) {
                case errors_1.TYPEORM_ENTITYNOTFOUND:
                    response.sendStatus(404);
                    return;
                default:
                    console.log(e);
                    response.status(400).json({ success: false });
                    return;
            }
        }
    });
}
exports.edit = edit;
//# sourceMappingURL=OrderController.js.map
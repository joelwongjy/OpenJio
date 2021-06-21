"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Jio_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jio = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Discardable_1 = require("./Discardable");
const Order_1 = require("./Order");
const User_1 = require("./User");
let Jio = Jio_1 = class Jio extends Discardable_1.Discardable {
    constructor(name, closeAt, paymentNumber, user, orderLimit) {
        super();
        this.entityName = "Jio";
        this.getOrders = () => __awaiter(this, void 0, void 0, function* () {
            const orders = (yield typeorm_1.getRepository(Jio_1).findOneOrFail({
                where: { id: this.id },
                relations: ["orders"],
            })).orders;
            return orders;
        });
        this.getListData = () => __awaiter(this, void 0, void 0, function* () {
            const orderCount = this.orders.length || (yield this.getOrders()).length;
            return Object.assign(Object.assign({}, this.getBase()), { name: this.name, closeAt: this.closeAt, username: this.user.username, orderCount });
        });
        this.getData = () => __awaiter(this, void 0, void 0, function* () {
            const orders = this.orders || this.getOrders();
            return Object.assign(Object.assign({}, (yield this.getListData())), { orders: yield Promise.all(orders.map((order) => order.getListData())), paymentNumber: this.paymentNumber });
        });
        this.name = name;
        this.closeAt = closeAt;
        this.paymentNumber = paymentNumber;
        this.user = user;
        this.orderLimit = orderLimit !== null && orderLimit !== void 0 ? orderLimit : 1000;
    }
};
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Jio.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamptz" }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], Jio.prototype, "closeAt", void 0);
__decorate([
    typeorm_1.Column({ type: "character varying" }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsPhoneNumber("SG"),
    __metadata("design:type", String)
], Jio.prototype, "paymentNumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], Jio.prototype, "orderLimit", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.openJios),
    __metadata("design:type", User_1.User)
], Jio.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Order_1.Order, (order) => order.jio),
    __metadata("design:type", Array)
], Jio.prototype, "orders", void 0);
Jio = Jio_1 = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, Date, String, User_1.User, Number])
], Jio);
exports.Jio = Jio;
//# sourceMappingURL=Jio.js.map
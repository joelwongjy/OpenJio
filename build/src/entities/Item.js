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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Discardable_1 = require("./Discardable");
const Order_1 = require("./Order");
let Item = class Item extends Discardable_1.Discardable {
    constructor(name, quantity, cost) {
        super();
        this.entityName = "Item";
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
    }
};
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Item.prototype, "cost", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Order_1.Order, (order) => order.items),
    __metadata("design:type", Order_1.Order)
], Item.prototype, "order", void 0);
Item = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, Number, Number])
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.js.map
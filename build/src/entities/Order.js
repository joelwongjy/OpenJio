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
var Order_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const Discardable_1 = require("./Discardable");
const Jio_1 = require("./Jio");
const Item_1 = require("./Item");
const User_1 = require("./User");
let Order = Order_1 = class Order extends Discardable_1.Discardable {
    constructor(user, jio) {
        super();
        this.entityName = "Order";
        this.getItems = () => __awaiter(this, void 0, void 0, function* () {
            const items = (yield typeorm_1.getRepository(Order_1).findOneOrFail({
                where: { id: this.id },
                relations: ["items"],
            })).items;
            return items;
        });
        this.getListData = () => __awaiter(this, void 0, void 0, function* () {
            const items = this.items || (yield this.getItems());
            const cost = items.map((item) => { var _a; return (_a = item.cost) !== null && _a !== void 0 ? _a : 0; }).reduce((a, b) => a + b);
            return Object.assign(Object.assign({}, this.getBase()), { paid: this.paid, itemCount: items.length, cost });
        });
        this.getData = () => __awaiter(this, void 0, void 0, function* () {
            const items = this.items || (yield this.getItems());
            return Object.assign(Object.assign({}, (yield this.getListData())), { items });
        });
        this.user = user;
        this.paid = false;
        this.jio = jio;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Order.prototype, "paid", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Item_1.Item, (item) => item.order),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Jio_1.Jio, (jio) => jio.orders),
    __metadata("design:type", Jio_1.Jio)
], Order.prototype, "jio", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.orders),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
Order = Order_1 = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [User_1.User, Jio_1.Jio])
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map
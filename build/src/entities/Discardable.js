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
exports.Discardable = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Base_1 = require("./Base");
class Discardable extends Base_1.Base {
    constructor() {
        super(...arguments);
        this.getBase = () => ({
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            discardedAt: this.discardedAt,
        });
    }
}
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], Discardable.prototype, "discardedAt", void 0);
exports.Discardable = Discardable;
//# sourceMappingURL=Discardable.js.map
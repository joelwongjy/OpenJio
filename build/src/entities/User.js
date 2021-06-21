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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcryptjs_1 = require("bcryptjs");
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const IsUniqueUsername_1 = __importDefault(require("../constraints/IsUniqueUsername"));
const IsMatch_1 = __importDefault(require("../constraints/IsMatch"));
const tokens_1 = require("../types/tokens");
const Discardable_1 = require("./Discardable");
const Jio_1 = require("./Jio");
const Order_1 = require("./Order");
let User = class User extends Discardable_1.Discardable {
    constructor(name, username, email, password, confirmPassword) {
        super();
        this.entityName = "User";
        this.createBearerToken = (tokenType, expiresIn) => {
            const payload = {
                tokenType,
                userId: this.id,
            };
            const token = jsonwebtoken_1.sign(payload, process.env.JWT_SECRET, { expiresIn });
            return token;
        };
        this.createAuthenticationToken = () => {
            const accessToken = this.createBearerToken(tokens_1.BearerTokenType.AccessToken, "7d");
            return { accessToken };
        };
        this.getListData = () => (Object.assign(Object.assign({}, this.getBase()), { username: this.username, name: this.name }));
        this.getData = () => {
            return this.getListData();
        };
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
    hashPassword() {
        this.password = this.password ? bcryptjs_1.hashSync(this.password) : null;
    }
};
__decorate([
    typeorm_1.Column({ type: "character varying" }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Validate(IsUniqueUsername_1.default),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ type: "character varying" }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: "character varying", nullable: true, select: false }),
    class_validator_1.MinLength(8),
    __metadata("design:type", Object)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "character varying", nullable: true, select: false }),
    class_validator_1.MinLength(8),
    IsMatch_1.default("password"),
    __metadata("design:type", Object)
], User.prototype, "confirmPassword", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Jio_1.Jio, (jio) => jio.user),
    __metadata("design:type", Array)
], User.prototype, "openJios", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Order_1.Order, (order) => order.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "hashPassword", null);
User = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String, String, String, String])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map
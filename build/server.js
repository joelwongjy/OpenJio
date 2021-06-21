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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServer = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("./ormconfig"));
const routes_1 = __importDefault(require("./src/routes"));
const corsOptions = {
    origin: "*",
};
class ApiServer {
    constructor() {
        this.connection = null;
        this.server = null;
    }
    initialize(port = 3001) {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield typeorm_1.createConnection(ormconfig_1.default);
            const app = express_1.default();
            app.use(body_parser_1.default.json({ limit: "20mb" }));
            app.use(body_parser_1.default.urlencoded({ extended: true, limit: "20mb" }));
            app.use(cors_1.default(corsOptions));
            app.use(helmet_1.default());
            if (process.env.NODE_ENV === "production") {
                app.use(express_1.default.static("frontend/build"));
                app.get("*", (req, res) => {
                    res.sendFile(path_1.default.resolve(__dirname, "frontend", "build", "index.html"));
                });
            }
            if (process.env.NODE_ENV !== "test") {
                console.log(`Express server has started on port ${port}.`);
                app.use(morgan_1.default("dev"));
            }
            app.use("/", routes_1.default);
            this.server = app.listen(port);
            this.server.timeout = 1200000;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection && (yield this.connection.close());
            this.server && this.server.close();
        });
    }
}
exports.ApiServer = ApiServer;
exports.default = ApiServer;
//# sourceMappingURL=server.js.map
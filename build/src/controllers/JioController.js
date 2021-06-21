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
exports.remove = exports.edit = exports.show = exports.showUserJios = exports.create = void 0;
const jio_1 = require("../services/jio");
const errors_1 = require("../types/errors");
function create(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jio = yield new jio_1.JioCreator().createJio(request.body);
            response.status(200).json({ success: true, id: jio.id });
            return;
        }
        catch (e) {
            console.log(e);
            response.status(400).json({ success: false });
            return;
        }
    });
}
exports.create = create;
function showUserJios(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const idInt = parseInt(id, 10);
            if (isNaN(idInt)) {
                response.status(400).json({ success: false });
                return;
            }
            const jio = yield new jio_1.JioGetter().getUserOpenJios(idInt);
            response.status(200).json(jio);
            return;
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
exports.showUserJios = showUserJios;
function show(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const idInt = parseInt(id, 10);
            if (isNaN(idInt)) {
                response.status(400).json({ success: false });
                return;
            }
            const jio = yield new jio_1.JioGetter().getJio(idInt);
            response.status(200).json(jio);
            return;
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
exports.show = show;
function edit(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        const editData = request.body;
        try {
            const idInt = parseInt(id, 10);
            if (isNaN(idInt)) {
                response.status(400).json({ success: false });
                return;
            }
            const jio = yield new jio_1.JioEditor().editJio(idInt, editData);
            response.status(200).json({ success: true, id: jio.id });
            return;
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
function remove(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const idInt = parseInt(id, 10);
            if (isNaN(idInt)) {
                response.status(400).json({ success: false });
                return;
            }
            yield new jio_1.JioDeleter().deleteJio(idInt);
            response.status(200).json({ success: true, id: idInt });
            return;
        }
        catch (e) {
            switch (e.name) {
                case errors_1.TYPEORM_ENTITYNOTFOUND:
                    response.status(404).json({ success: false });
                    return;
                default:
                    console.log(e);
                    response.status(400).json({ success: false });
                    return;
            }
        }
    });
}
exports.remove = remove;
//# sourceMappingURL=JioController.js.map
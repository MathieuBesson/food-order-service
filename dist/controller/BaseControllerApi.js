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
exports.BaseControllerApi = void 0;
const BaseModel_1 = require("../models/BaseModel");
const http_status_codes_1 = require("http-status-codes");
class BaseControllerApi {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(http_status_codes_1.StatusCodes.CREATED).send(yield this.model.getAll());
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(http_status_codes_1.StatusCodes.CREATED).send(yield this.model.getOne(req.params.id));
        });
    }
    insertOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.areParametersValid(req, res)) === false) {
                return;
            }
            res.status(http_status_codes_1.StatusCodes.CREATED).send(yield this.model.insertOne(req.body));
        });
    }
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.areParametersValid(req, res)) === false) {
                return;
            }
            res.status(http_status_codes_1.StatusCodes.CREATED).send(yield this.model.updateOne(req.body));
        });
    }
    deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send(yield this.model.deleteOne(req.params.id));
        });
    }
    areParametersValid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield BaseModel_1.BaseValidator.getErrorsDataTypeIncorrect(req.body, this.model.typeValidator);
            if (errors.length > 0) {
                this.sendBadRequestError(errors, "ValidationData", res);
                return false;
            }
            return true;
        });
    }
    sendBadRequestError(errors, type, res) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            type,
            errors,
        });
    }
}
exports.BaseControllerApi = BaseControllerApi;

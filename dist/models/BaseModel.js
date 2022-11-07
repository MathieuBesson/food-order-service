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
exports.BaseValidator = exports.BaseModel = void 0;
const class_validator_1 = require("class-validator");
class BaseModel {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelMongo.find();
        });
    }
    search(object) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelMongo.findOne(object);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelMongo.findOne({ _id: id });
        });
    }
    insertOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const object = new this.modelMongo(Object.assign(Object.assign({}, body), { date: new Date() }));
            return yield object.save();
        });
    }
    updateOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const object = yield this.modelMongo.findOne({ _id: body._id });
            return yield (object === null || object === void 0 ? void 0 : object.updateOne(body));
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelMongo.deleteOne({ name: id });
        });
    }
}
exports.BaseModel = BaseModel;
class BaseValidator {
    constructor() { }
    static getErrorsDataTypeIncorrect(data, dataValidator) {
        return __awaiter(this, void 0, void 0, function* () {
            const attributes = Object.getOwnPropertyNames(dataValidator);
            // Errors don't have required parameters
            const errorDontHaveRequiredParameters = this.getErrorDontHaveRequiredParameters(data, attributes);
            if (errorDontHaveRequiredParameters.length > 0) {
                return errorDontHaveRequiredParameters;
            }
            // Insert each data in validator
            attributes.forEach((attribute) => {
                dataValidator[attribute] = data[attribute];
            });
            // Verify input parameters
            const errors = yield (0, class_validator_1.validate)(dataValidator);
            if (errors.length) {
                return errors;
            }
            return [];
        });
    }
    static getErrorDontHaveRequiredParameters(userData, attributes) {
        let errors = [];
        for (const attribute of attributes) {
            if (!userData.hasOwnProperty(attribute)) {
                errors.push(`The ${attribute} attribute should be present in the passed data`);
            }
        }
        return errors;
    }
}
exports.BaseValidator = BaseValidator;

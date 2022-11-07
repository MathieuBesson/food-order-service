"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodValidator = exports.Food = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const baseModel_1 = require("./baseModel");
const FoodSchema = new mongoose_1.Schema({
    name: String,
    type: String,
    quantity: String,
    date: { type: Date, default: Date.now },
}, { versionKey: false });
const FoodModelMongo = (0, mongoose_1.model)("Food", FoodSchema);
class Food extends baseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.modelMongo = FoodModelMongo;
        this.typeValidator = FoodValidator;
    }
}
exports.Food = Food;
class FoodValidator extends baseModel_1.BaseValidator {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100)
], FoodValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(200)
], FoodValidator.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)()
], FoodValidator.prototype, "quantity", void 0);
exports.FoodValidator = FoodValidator;

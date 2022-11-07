"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishValidator = exports.Dish = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const baseModel_1 = require("./baseModel");
const DishSchema = new mongoose_1.Schema({
    name: String,
    foods: [
        {
            _id: String,
            quantity: Number,
        },
    ],
    type: String,
    quantity: Number,
    date: { type: Date, default: Date.now },
}, { versionKey: false });
const DishModelMongo = (0, mongoose_1.model)("Dish", DishSchema);
class Dish extends baseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.modelMongo = DishModelMongo;
        this.typeValidator = new DishValidator();
    }
}
exports.Dish = Dish;
class DishValidator extends baseModel_1.BaseValidator {
    constructor() {
        super(...arguments);
        this.name = "";
        this.foods = [];
        this.type = "";
        this.quantity = 0;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100)
], DishValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(200)
], DishValidator.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)()
], DishValidator.prototype, "quantity", void 0);
exports.DishValidator = DishValidator;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishValidator = exports.Dish = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const BaseModel_1 = require("./BaseModel");
const Food_1 = require("./Food");
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
class Dish extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.modelMongo = DishModelMongo;
        this.typeValidator = new DishValidator();
    }
    getOneWithDisponibility(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let dish = yield this.modelMongo
                .findOne({ _id: id })
                .lean();
            if (dish === null) {
                return null;
            }
            let foodsNeeded = [];
            const foodModel = new Food_1.Food();
            // Get all Foods needed
            for (const food of dish.foods) {
                const foodRequested = yield foodModel.modelMongo.findOne({
                    _id: food._id,
                });
                if (foodRequested === null) {
                    console.error(`The food with the id ${food._id} is unknown`);
                    return null;
                }
                foodsNeeded.push({
                    food: foodRequested,
                    quantity: food.quantity,
                });
            }
            return Object.assign(Object.assign({}, dish), { disponibility: Math.min(...foodsNeeded.map((foodData) => Math.floor(foodData.food.quantity / foodData.quantity))) });
        });
    }
}
exports.Dish = Dish;
class DishValidator extends BaseModel_1.BaseValidator {
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

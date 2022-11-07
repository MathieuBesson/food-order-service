"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodController = void 0;
const Food_1 = require("../models/Food");
const BaseControllerApi_1 = require("./BaseControllerApi");
class FoodController extends BaseControllerApi_1.BaseControllerApi {
    constructor() {
        super(...arguments);
        this.model = new Food_1.Food();
    }
}
exports.FoodController = FoodController;

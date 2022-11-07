"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerDish = void 0;
const dish_1 = require("../models/dish");
const baseControllerApi_1 = require("./baseControllerApi");
class ControllerDish extends baseControllerApi_1.BaseControllerApi {
    constructor() {
        super(...arguments);
        this.model = new dish_1.Dish();
    }
}
exports.ControllerDish = ControllerDish;

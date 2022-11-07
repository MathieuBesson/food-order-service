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
exports.DishController = void 0;
const http_status_codes_1 = require("http-status-codes");
const Dish_1 = require("../models/Dish");
const BaseControllerApi_1 = require("./BaseControllerApi");
class DishController extends BaseControllerApi_1.BaseControllerApi {
    constructor() {
        super(...arguments);
        this.model = new Dish_1.Dish();
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(http_status_codes_1.StatusCodes.CREATED).send(yield this.model.getOneWithDisponibility(req.params.id));
        });
    }
}
exports.DishController = DishController;

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
exports.OrderController = void 0;
const BaseControllerApi_1 = require("./BaseControllerApi");
const Order_1 = require("../models/Order");
const Dish_1 = require("../models/Dish");
class OrderController extends BaseControllerApi_1.BaseControllerApi {
    constructor() {
        super(...arguments);
        this.model = new Order_1.Order();
    }
    insertOne(req, res) {
        const _super = Object.create(null, {
            insertOne: { get: () => super.insertOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.isQuantityUnavailable(req, res)) === false) {
                return;
            }
            yield this.decreaseFoodAmount(req);
            yield _super.insertOne.call(this, req, res);
        });
    }
    isQuantityUnavailable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = [];
            const dish = new Dish_1.Dish();
            req.body.dishs.forEach((dishData) => __awaiter(this, void 0, void 0, function* () {
                const dishObject = yield dish.getOneWithDisponibility(dishData._id);
                if (dishObject !== null &&
                    dishData.quantity > dishObject.quantity) {
                    let errorMessage = dishObject.quantity > 0
                        ? `Only ${dishObject.quantity} ${dishObject.name} available`
                        : `The ${dishObject.name} dish is no longer available`;
                    errors.push(errorMessage);
                }
            }));
            if (errors.length > 0) {
                this.sendBadRequestError(errors, "ValidationData", res);
                return false;
            }
            return true;
        });
    }
    decreaseFoodAmount(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const dish = new Dish_1.Dish();
            req.body.dishs.forEach((dishData) => __awaiter(this, void 0, void 0, function* () {
                const dishObject = yield dish.getOne(dishData._id);
                if (dishObject !== null) {
                    dish.decreaseFoodAmount(dishObject);
                }
            }));
        });
    }
}
exports.OrderController = OrderController;

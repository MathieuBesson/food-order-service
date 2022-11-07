"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidator = exports.Order = void 0;
const mongoose_1 = require("mongoose");
const BaseModel_1 = require("./BaseModel");
const OrderSchema = new mongoose_1.Schema({
    dishs: [
        {
            _id: String,
            quantity: Number,
        },
    ],
    date: { type: Date, default: Date.now },
}, { versionKey: false });
const OrderModelMongo = (0, mongoose_1.model)("Order", OrderSchema);
class Order extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.modelMongo = OrderModelMongo;
        this.typeValidator = OrderValidator;
    }
}
exports.Order = Order;
class OrderValidator extends BaseModel_1.BaseValidator {
    constructor() {
        super(...arguments);
        this.dishs = [];
    }
}
exports.OrderValidator = OrderValidator;

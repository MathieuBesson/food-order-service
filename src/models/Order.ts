import { model, Model, Schema } from "mongoose";
import { OrderType } from "../types/OrderType";
import { BaseModel, BaseValidator } from "./BaseModel";
import { ModelInterface } from "./ModelInterface";

const OrderSchema = new Schema<OrderType>(
    {
        dishs: [
            {
                _id: String,
                quantity: Number,
            },
        ],
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const OrderModelMongo: Model<OrderType> = model("Order", OrderSchema);

export class Order
    extends BaseModel<OrderType>
    implements ModelInterface<OrderType>
{
    modelMongo: Model<OrderType> = OrderModelMongo;
    typeValidator: BaseValidator = OrderValidator;
}

export class OrderValidator
    extends BaseValidator
    implements Pick<OrderType, "dishs">
{
    dishs: {
        _id: String;
        quantity: Number;
    }[] = [];
}

import { Schema } from "mongoose";
import { OrderType } from "./order.type";

export const OrderSchema = new Schema<OrderType>(
    {
        dishs: [
            {
                _id: String,
                quantity: Number,
            },
        ],
        transmitted: Boolean,
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

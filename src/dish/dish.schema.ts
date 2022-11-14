import { Schema } from "mongoose";
import { DishType } from "./dish.type";

export const DishSchema = new Schema<DishType>(
    {
        name: String,
        foods: [
            {
                _id: String,
                quantity: Number,
            },
        ],
        type: String,
        image: String,
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

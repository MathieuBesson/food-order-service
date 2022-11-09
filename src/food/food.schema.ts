import { Schema } from "mongoose";
import { FoodType } from "./food.type";

export const FoodSchema = new Schema<FoodType>(
    {
        name: String,
        type: String,
        quantity: String,
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

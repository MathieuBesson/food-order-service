import {
    IsNumber,
    IsPositive,
    isPositive,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from "class-validator";
import { model, Model, Models, Schema } from "mongoose";
import { DishType } from "../types/dishType";
import { BaseModel, BaseValidator } from "./baseModel";
import { ModelInterface } from "./modelInterface";

const DishSchema = new Schema<DishType>(
    {
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
    },
    { versionKey: false }
);

const DishModelMongo: Model<DishType> = model("Dish", DishSchema);

export class Dish
    extends BaseModel<DishType>
    implements ModelInterface<DishType>
{
    modelMongo: Model<DishType> = DishModelMongo;
    typeValidator: BaseValidator = new DishValidator();
}

export class DishValidator
    extends BaseValidator
    implements Pick<DishType, "name" | "type" | "quantity">
{
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string = "";

    foods: {
        _id: String;
        quantity: Number;
    }[] = [];

    @IsString()
    @MinLength(8)
    @MaxLength(200)
    type: string = "";

    @IsNumber()
    @IsPositive()
    quantity: number = 0;
}

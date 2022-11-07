import {
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import { model, Model, Schema } from "mongoose";
import { FoodType } from "../types/FoodType";
import { BaseModel, BaseValidator } from "./BaseModel";
import { ModelInterface } from "./ModelInterface";

const FoodSchema = new Schema<FoodType>(
    {
        name: String,
        type: String,
        quantity: String,
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const FoodModelMongo: Model<FoodType> = model("Food", FoodSchema);

export class Food
    extends BaseModel<FoodType>
    implements ModelInterface<FoodType>
{
    modelMongo: Model<FoodType> = FoodModelMongo;
    typeValidator: BaseValidator = FoodValidator;
}

export class FoodValidator
    extends BaseValidator
    implements Pick<FoodType, "name" | "type" | "quantity">
{
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(200)
    type!: string;

    @IsNumber()
    @IsPositive()
    quantity!: number;
}

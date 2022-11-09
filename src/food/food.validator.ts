import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
    Min,
    MinLength,
} from "class-validator";
import { model, Model, Schema } from "mongoose";
import { FoodDishType, FoodType } from "./food.type";
import { BaseValidator } from "../base/base.validator";

export class FoodValidator
    extends BaseValidator
    implements Pick<FoodType, "name" | "type" | "quantity">
{
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    @IsNotEmpty()
    name: string = "";

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    @IsNotEmpty()
    type: string = "";

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    quantity: number = 0;
}

export class FoodDishValidator
    extends BaseValidator
    implements Pick<FoodDishType, "_id" | "quantity">
{
    @IsString()
    @IsNotEmpty()
    _id: string = "";

    @IsNumber()
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    quantity: number = 0;
}

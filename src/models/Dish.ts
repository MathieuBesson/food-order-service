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
import { DishType } from "../types/DishType";
import { FoodType } from "../types/FoodType";
import { BaseModel, BaseValidator } from "./BaseModel";
import { Food } from "./Food";
import { ModelInterface } from "./ModelInterface";

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

    public async getOneWithDisponibility(id: string): Promise<DishType | null> {
        let dish: DishType | null = await this.modelMongo
            .findOne({ _id: id })
            .lean();

        if (dish === null) {
            return null;
        }

        let foodsNeeded: {
            food: FoodType;
            quantity: number;
        }[] = [];
        const foodModel: Food = new Food();

        // Get all Foods needed
        for (const food of dish.foods) {
            const foodRequested = await foodModel.modelMongo.findOne({
                _id: food._id,
            });

            if (foodRequested === null) {
                console.error(`The food with the id ${food._id} is unknown`);
                return null;
            }

            foodsNeeded.push({
                food: foodRequested,
                quantity: food.quantity,
            });
        }

        return {
            ...dish,
            disponibility: Math.min(
                ...foodsNeeded.map((foodData) =>
                    Math.floor(foodData.food.quantity / foodData.quantity)
                )
            ),
        };
    }
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

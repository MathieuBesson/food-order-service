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
import { FoodShortType } from "../types/FoodShortType";
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

        return await this.setDisponibilityForOne(dish.foods, dish);
    }

    public async getAllWithDisponibilities(): Promise<DishType[]> {
        let dishs: DishType[] = await this.modelMongo.find().lean();

        for (const key in dishs) {
            dishs[key] = await this.setDisponibilityForOne(
                dishs[key].foods,
                dishs[key]
            );
        }
        return dishs;
    }

    private async setDisponibilityForOne(
        foodsData: FoodShortType[],
        dish: DishType
    ): Promise<DishType> {
        const foodsNeeded = await this.getAllFoodsNeeded(foodsData);

        return {
            ...dish,
            disponibility: Math.min(
                ...foodsNeeded.map((foodData) =>
                    Math.floor(foodData.food.quantity / foodData.quantity)
                )
            ),
        };
    }

    private async getAllFoodsNeeded(
        foodsData: FoodShortType[]
    ): Promise<{ food: FoodType; quantity: number }[]> {
        const foodModel: Food = new Food();

        let foodsNeeded: {
            food: FoodType;
            quantity: number;
        }[] = [];

        // Get all Foods needed
        for (const food of foodsData) {
            const foodRequested = await foodModel.modelMongo.findOne({
                _id: food._id,
            });

            if (foodRequested === null) {
                throw new Error(`The food with the id ${food._id} is unknown`);
            }

            foodsNeeded.push({
                food: foodRequested,
                quantity: food.quantity,
            });
        }

        return foodsNeeded;
    }

    public async decreaseFoodAmount(dish: DishType) {
        const foodIds: string[] = [];
        const foodMapQuantity: { [foodId: string]: number } = {};
        const foodModel: Food = new Food();

        dish.foods.forEach((foodData) => {
            foodIds.push(foodData._id);
            foodMapQuantity[foodData._id] = foodData.quantity;
        });

        let foods: FoodType[] = await foodModel.modelMongo.find({
            _id: { $in: foodIds },
        });

        foods.forEach((food, key) => {
            if (!food._id) {
                throw new Error(`The food with the id ${food._id} is unknown`);
            }
            foods[key].quantity -= foodMapQuantity[food._id];
        });

        foodModel.modelMongo.updateMany(foods);
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

    foods: FoodShortType[] = [];

    @IsString()
    @MinLength(8)
    @MaxLength(200)
    type: string = "";

    @IsNumber()
    @IsPositive()
    quantity: number = 0;
}

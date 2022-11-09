import { model, Model, Schema } from "mongoose";
import { DishType } from "./dish.type";
import { FoodDishType, FoodType } from "../food/food.type";
import { BaseRepository } from "../base/base.model";
import { FoodRepository } from "../food/food.repository";
import "reflect-metadata";
import { BaseValidator } from "../base/base.validator";
import { DishSchema } from "./dish.schema";
import { DishValidator } from "./dish.validator";
import { RepositoryInterface } from "../../interfaces/interface.repository";

export class DishRepository
    extends BaseRepository<DishType>
    implements RepositoryInterface<DishType>
{
    getAllOrderByType(): any {
        throw new Error("Method not implemented.");
    }
    schema: Model<DishType> = model("Dish", DishSchema);
    typeValidator: BaseValidator = new DishValidator();

    public async getOneWithDisponibility(id: string): Promise<DishType | null> {
        let dish: DishType | null = await this.schema
            .findOne({ _id: id })
            .lean();

        if (dish === null) {
            return null;
        }

        return await this.setDisponibilityForOne(dish.foods, dish);
    }

    public async getAllWithDisponibilities(): Promise<DishType[]> {
        let dishs: DishType[] = await this.schema.find().lean();

        for (const key in dishs) {
            dishs[key] = await this.setDisponibilityForOne(
                dishs[key].foods,
                dishs[key]
            );
        }
        return dishs;
    }

    private async setDisponibilityForOne(
        foodsData: FoodDishType[],
        dish: DishType
    ): Promise<DishType> {
        const foodsNeeded = await this.getAllFoodsNeeded(foodsData);
        console.log(foodsNeeded);

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
        foodsData: FoodDishType[]
    ): Promise<{ food: FoodType; quantity: number }[]> {
        const foodRepository: FoodRepository = new FoodRepository();

        let foodsNeeded: {
            food: FoodType;
            quantity: number;
        }[] = [];

        // Get all Foods needed
        for (const food of foodsData) {
            const foodRequested = await foodRepository.schema.findOne({
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

    public async decreaseFoodAmount(dish: DishType, quantityRequested: number) {
        const foodIds: string[] = [];
        const foodMapQuantity: { [foodId: string]: number } = {};
        const foodRepository: FoodRepository = new FoodRepository();

        dish.foods.forEach((foodData) => {
            foodIds.push(foodData._id);
            foodMapQuantity[foodData._id] = foodData.quantity;
        });

        let foods: any[] = await foodRepository.schema.find({
            _id: { $in: foodIds },
        });

        foods.forEach(async (food, key) => {
            if (!food._id) {
                throw new Error(`The food with the id ${food._id} is unknown`);
            }
            foods[key].quantity -=
                foodMapQuantity[food._id] * quantityRequested;

            await foods[key].updateOne(foods[key]);
        });
    }
}

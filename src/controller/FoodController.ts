import { Food } from "../models/Food";
import { BaseModel } from "../models/BaseModel";
import { BaseControllerApi } from "./BaseControllerApi";
import { FoodType } from "../types/FoodType";

export class FoodController extends BaseControllerApi<FoodType> {
    public model: BaseModel<FoodType> = new Food();
}

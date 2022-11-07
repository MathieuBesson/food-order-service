import { Food } from "../models/food";
import { BaseModel } from "../models/baseModel";
import { BaseControllerApi } from "./baseControllerApi";
import { FoodType } from "../types/foodType";

export class ControllerFood extends BaseControllerApi<FoodType> {
    public model: BaseModel<FoodType> = new Food();
}

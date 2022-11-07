import { BaseModel } from "../models/baseModel";
import { Dish } from "../models/dish";
import { DishType } from "../types/dishType";
import { BaseControllerApi } from "./baseControllerApi";

export class ControllerDish extends BaseControllerApi<DishType> {
    public model: BaseModel<DishType> = new Dish();
}

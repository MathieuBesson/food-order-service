import { BaseModel } from "../models/BaseModel";
import { Dish } from "../models/Dish";
import { DishType } from "../types/DishType";
import { BaseControllerApi } from "./BaseControllerApi";

export class DishController extends BaseControllerApi<DishType> {
    public model: BaseModel<DishType> = new Dish();
}

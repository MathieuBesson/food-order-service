import { FoodRepository } from "./food.repository";
import { BaseRepository } from "../base/base.model";
import { FoodType } from "./food.type";
import { BaseControllerApi } from "../base/base.controller.api";

export class FoodController extends BaseControllerApi<FoodType> {
    public model: BaseRepository<FoodType> = new FoodRepository();
}

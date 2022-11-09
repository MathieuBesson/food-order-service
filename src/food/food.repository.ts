import { model, Model, Schema } from "mongoose";
import { FoodType } from "./food.type";
import { BaseValidator } from "../base/base.validator";
import { BaseRepository } from "../base/base.model";
import { FoodSchema } from "./food.schema";
import { FoodValidator } from "./food.validator";
import { RepositoryInterface } from "../../interfaces/interface.repository";

export class FoodRepository
    extends BaseRepository<FoodType>
    implements RepositoryInterface<FoodType>
{
    schema: Model<FoodType> = model("Food", FoodSchema);
    typeValidator: BaseValidator = new FoodValidator();
}

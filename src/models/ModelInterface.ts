import { Model } from "mongoose";
import { BaseType } from "../types/BaseType";
import { DishType } from "../types/DishType";
import { BaseValidator } from "./BaseModel";

export interface ModelInterface<T extends BaseType> {
    modelMongo: Model<T>;
    typeValidator: BaseValidator;
}

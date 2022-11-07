import { Model } from "mongoose";
import { BaseType } from "../types/baseType";
import { DishType } from "../types/dishType";
import { BaseValidator } from "./baseModel";

export interface ModelInterface<T extends BaseType> {
    modelMongo: Model<T>;
    typeValidator: BaseValidator;
}

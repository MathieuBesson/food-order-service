import { Model } from "mongoose";
import { BaseType } from "../src/base/base.type";
import { BaseValidator } from "../src/base/base.validator";

export interface RepositoryInterface<T extends BaseType> {
    schema: Model<T>;
    typeValidator: BaseValidator;
}

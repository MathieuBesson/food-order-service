import { BaseModel } from "../models/baseModel";
import { BaseType } from "../types/baseType";

export interface interfaceControllerApi<T extends BaseType> {
    model: BaseModel<T>;
}

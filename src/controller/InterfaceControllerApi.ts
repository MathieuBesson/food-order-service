import { BaseModel } from "../models/BaseModel";
import { BaseType } from "../types/BaseType";

export interface InterfaceControllerApi<T extends BaseType> {
    model: BaseModel<T>;
}

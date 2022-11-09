import { BaseRepository } from "../src/base/base.model";
import { BaseType } from "../src/base/base.type";

export interface ControllerInterfaceApi<T extends BaseType> {
    model: BaseRepository<T>;
}

import { BaseType } from "./BaseType";

export interface OrderType extends BaseType {
    dishs: {
        _id: String;
        quantity: Number;
    }[];
}

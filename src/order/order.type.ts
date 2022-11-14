import { BaseType } from "../base/base.type";

export interface OrderType extends BaseType {
    dishs: {
        _id: String;
        quantity: Number;
    }[];
    transmitted: boolean;
}

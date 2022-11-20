import { BaseType } from "../base/base.type";

export interface OrderType extends BaseType {
    dishs: {
        _id: string;
        quantity: number;
    }[];
    transmitted: boolean;
    userId: string
}

import { BaseType } from "../base/base.type";

export interface DishType extends BaseType {
    name: string;
    foods: {
        _id: string;
        quantity: number;
    }[];
    type: string;
    disponibility: number;
    image: string;
}

export interface DishOrderType {
    _id: string;
    quantity: number;
}

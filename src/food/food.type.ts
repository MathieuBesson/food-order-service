import { BaseType } from "../base/base.type";

export interface FoodType extends BaseType {
    name: string;
    quantity: number;
    type: string;
}

export interface FoodDishType {
    _id: string;
    quantity: number;
}

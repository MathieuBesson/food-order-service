import { BaseType } from "./baseType";

export interface FoodType extends BaseType {
    name: string;
    quantity: number;
    type: String;
    date: Date;
}

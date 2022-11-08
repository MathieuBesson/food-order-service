import { BaseType } from "./BaseType";

export interface FoodType extends BaseType {
    name: string;
    quantity: number;
    type: string;
}

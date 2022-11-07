import { BaseType } from "./BaseType";

export interface DishType extends BaseType {
    name: string;
    foods: {
        _id: string;
        quantity: number;
    }[];
    quantity: Number;
    type: String;
    disponibility: Number;
}

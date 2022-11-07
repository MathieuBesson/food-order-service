import { BaseType } from "./baseType";

// export interface DishType extends BaseType {
//     name: string;
//     foods: Array<{
//         _id: string;
//         quantity: number;
//     }>;
//     type: String;
// }

export interface DishType extends BaseType {
    name: string;
    foods: {
        _id: string;
        quantity: number;
    }[];
    quantity: Number;
    type: String;
};

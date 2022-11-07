import { BaseType } from "./baseType";

export interface UserType extends BaseType {
    login: string;
    password: string;
    tokenList: string[];
}

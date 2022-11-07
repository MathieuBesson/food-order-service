import { BaseType } from "./BaseType";

export interface UserType extends BaseType {
    login: string;
    password: string;
    tokenList: string[];
}

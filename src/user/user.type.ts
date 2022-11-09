import { BaseType } from "../base/base.type";

export interface UserType extends BaseType {
    login: string;
    password: string;
    tokenList: string[];
}

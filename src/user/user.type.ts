import { BaseType } from "../base/base.type";

export enum ROLE {
    ADMIN = 0,
    CLIENT = 1,
}

export interface UserType extends BaseType {
    login: string;
    password: string;
    roles: number[];
}

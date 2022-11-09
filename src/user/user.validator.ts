import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { BaseValidator } from "../base/base.validator";
import { UserType } from "./user.type";

// User validation insert
export class UserValidator
    extends BaseValidator
    implements Pick<UserType, "login" | "password">
{
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @IsNotEmpty()
    login: string = "";

    @IsString()
    @MinLength(8)
    @MaxLength(200)
    @IsNotEmpty()
    password: string = "";
}

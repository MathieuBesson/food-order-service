import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { BaseValidator } from "../base/base.validator";
import { TokenType } from "./token.type";

export class TokenValidator extends BaseValidator implements Pick<TokenType, "token"> {
    @IsString()
    @MinLength(10)
    @MaxLength(500)
    @IsNotEmpty()
    token: string = "";

    @IsString()
    @IsNotEmpty()
    userId: string = "";
}

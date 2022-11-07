import { model, Model, Schema } from "mongoose";
import { TokenType } from "../types/tokenType";
import { BaseModel, BaseValidator } from "./baseModel";
import * as token from "random-web-token";
import { ModelInterface } from "./modelInterface";
import { IsString, MaxLength, MinLength } from "class-validator";

const TokenSchema = new Schema<TokenType>(
    {
        token: String,
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const TokenModelMongo: Model<TokenType> = model("Token", TokenSchema);

export class Token
    extends BaseModel<TokenType>
    implements ModelInterface<TokenType>
{
    modelMongo: Model<TokenType> = TokenModelMongo;
    typeValidator: BaseValidator = TokenValidator;

    public async saveOne() {
        const object = new this.modelMongo({
            token: Token.generateOne(),
            date: new Date(),
        });
        return await object.save();
    }

    public async isTokenValide(token: String) {
        return (await this.getAll()).some(
            (currentToken: TokenType) => currentToken.token === token
        );
    }

    public static generateOne() {
        return token.genSync("extra", 250);
    }
}

export class TokenValidator
    extends BaseValidator
    implements Pick<TokenType, "token">
{
    @IsString()
    @MinLength(10)
    @MaxLength(500)
    token!: string;
}

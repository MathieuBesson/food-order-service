import { model, Model } from "mongoose";
import { BaseRepository } from "../base/base.model";
import * as token from "random-web-token";
import { BaseValidator } from "../base/base.validator";
import { TokenSchema } from "./token.schema";
import { TokenValidator } from "./token.validator";
import { TokenType } from "./token.type";
import { RepositoryInterface } from "../../interfaces/interface.repository";

export class TokenRepository
    extends BaseRepository<TokenType>
    implements RepositoryInterface<TokenType>
{
    schema: Model<TokenType> = model("Token", TokenSchema);
    typeValidator: BaseValidator = new TokenValidator();

    public async saveOne() {
        const object = new this.schema({
            token: TokenRepository.generateOne(),
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

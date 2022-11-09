import { Schema } from "mongoose";
import { TokenType } from "./token.type";

export const TokenSchema = new Schema<TokenType>(
    {
        token: String,
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

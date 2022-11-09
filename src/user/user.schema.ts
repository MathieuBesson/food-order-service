import { Schema } from "mongoose";
import { UserType } from "./user.type";

export const UserSchema = new Schema<UserType>(
    {
        login: String,
        password: String,
        tokenList: [],
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

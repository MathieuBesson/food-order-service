import mongoose, { model, Model, Schema } from "mongoose";
import { UserType } from "../types/UserType";
import { BaseModel, BaseValidator } from "./BaseModel";
import bcrypt from "bcrypt";
import { ModelInterface } from "./ModelInterface";
import { IsString, MaxLength, MinLength } from "class-validator";

const UserSchema = new Schema<UserType>(
    {
        login: String,
        password: String,
        tokenList: [],
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const UserModelMongo: Model<UserType> = model("User", UserSchema);

export class User
    extends BaseModel<UserType>
    implements ModelInterface<UserType>
{
    modelMongo: Model<UserType> = UserModelMongo;
    typeValidator: BaseValidator = UserValidator;

    public static crypt(password: string) {
        return bcrypt.hashSync(
            password,
            process.env.AUTHENTICATION_SALT as string
        );
    }

    public static haveOnlyDataToRegister(dataToRegister: any) {
        return (
            dataToRegister.hasOwnProperty("password") &&
            dataToRegister.hasOwnProperty("login")
        );
    }
}

// User validation insert
export class UserValidator
    extends BaseValidator
    implements Pick<UserType, "login" | "password">
{
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    login!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(200)
    password!: string;
}

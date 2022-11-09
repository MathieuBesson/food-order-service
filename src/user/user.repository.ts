import { model, Model } from "mongoose";
import { BaseRepository } from "../base/base.model";
import bcrypt from "bcrypt";
import { BaseValidator } from "../base/base.validator";
import { RepositoryInterface } from "../../interfaces/interface.repository";
import { UserSchema } from "./user.schema";
import { UserType } from "./user.type";
import { UserValidator } from "./user.validator";

export class UserRepository
    extends BaseRepository<UserType>
    implements RepositoryInterface<UserType>
{
    schema: Model<UserType> = model("User", UserSchema);
    typeValidator: BaseValidator = new UserValidator();

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

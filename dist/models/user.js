"use strict";
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (
            typeof Reflect === "object" &&
            typeof Reflect.decorate === "function"
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = exports.User = void 0;
const mongoose_1 = require("mongoose");
const baseModel_1 = require("./baseModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const class_validator_1 = require("class-validator");
const UserSchema = new mongoose_1.Schema(
    {
        login: String,
        password: String,
        tokenList: [],
        date: { type: Date, default: Date.now },
    },
    { versionKey: false }
);
const UserModelMongo = (0, mongoose_1.model)("User", UserSchema);
class User extends baseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.modelMongo = UserModelMongo;
        this.typeValidator = UserValidator;
    }
    static crypt(password) {
        return bcrypt_1.default.hashSync(
            password,
            process.env.AUTHENTICATION_SALT
        );
    }
    static haveOnlyDataToRegister(dataToRegister) {
        return (
            dataToRegister.hasOwnProperty("password") &&
            dataToRegister.hasOwnProperty("login")
        );
    }
}
exports.User = User;
// User validation insert
class UserValidator extends baseModel_1.BaseValidator {}
__decorate(
    [
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(3),
        (0, class_validator_1.MaxLength)(100),
    ],
    UserValidator.prototype,
    "login",
    void 0
);
__decorate(
    [
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.MaxLength)(200),
    ],
    UserValidator.prototype,
    "password",
    void 0
);
exports.UserValidator = UserValidator;

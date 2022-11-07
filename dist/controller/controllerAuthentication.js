"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerAuthentication = void 0;
const class_validator_1 = require("class-validator");
const http_status_codes_1 = require("http-status-codes");
const token_1 = require("../models/token");
const user_1 = require("../models/user");
class ControllerAuthentication {
    constructor() {
        this.user = new user_1.User();
        this.token = new token_1.Token();
    }
    /**
     * Register an user
     * @param req
     * @param res
     * @returns
     */
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.checkHaveRequiredParameters(req, res)) === false) {
                return;
            }
            // Check login is not use
            if ((yield new user_1.User().search({ login: req.body.login })) !== null) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                    error: "Your username is invalid",
                });
                return;
            }
            // User's creation
            res.status(http_status_codes_1.StatusCodes.CREATED).send(yield this.user.insertOne(Object.assign(Object.assign({}, req.body), { tokenList: [], password: user_1.User.crypt(req.body.password) })));
        });
    }
    /**
     * Generate a token
     * @param req
     * @param res
     * @returns
     */
    generateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.checkHaveRequiredParameters(req, res)) === false) {
                return;
            }
            // Get user by credentials
            const currentUser = yield this.user.search({
                login: req.body.login,
                password: user_1.User.crypt(req.body.password),
            });
            if (currentUser === null) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                    error: "You must specify a correct login and password couple in the body of your request",
                });
                return;
            }
            // Send token if credentials match
            let token = null;
            token = yield this.token.saveOne();
            currentUser.tokenList.push(token._id.toString());
            // Add token in the list of user's
            yield this.user.updateOne(currentUser);
            res.status(http_status_codes_1.StatusCodes.OK).send({ token: token.token });
            return;
        });
    }
    /**
     * Check if login & password are specify
     * @param req
     * @param res
     * @returns Boolean
     */
    checkHaveRequiredParameters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // data from the token that is verified
            const noteNew = new user_1.UserValidator();
            noteNew.password = req.body.password;
            noteNew.login = req.body.login;
            // verify input parameters
            const errors = yield (0, class_validator_1.validate)(noteNew);
            if (errors.length) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(errors);
                return false;
            }
            return true;
        });
    }
}
exports.ControllerAuthentication = ControllerAuthentication;
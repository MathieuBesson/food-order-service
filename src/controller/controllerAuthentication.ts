import { validate } from "class-validator";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Token } from "../models/token";
import { User, UserValidator } from "../models/user";
import { UserType } from "../types/userType";

export class ControllerAuthentication {
    public user: User = new User();
    public token: Token = new Token();

    /**
     * Register an user
     * @param req
     * @param res
     * @returns
     */
    public async register(req: Request, res: Response) {
        if ((await this.checkHaveRequiredParameters(req, res)) === false) {
            return;
        }

        // Check login is not use
        if ((await new User().search({ login: req.body.login })) !== null) {
            res.status(StatusCodes.BAD_REQUEST).send({
                error: "Your username is invalid",
            });
            return;
        }

        // User's creation
        res.status(StatusCodes.CREATED).send(
            await this.user.insertOne({
                ...req.body,
                tokenList: [],
                password: User.crypt(req.body.password),
            })
        );
    }

    /**
     * Generate a token
     * @param req
     * @param res
     * @returns
     */
    public async generateToken(req: Request, res: Response) {
        if ((await this.checkHaveRequiredParameters(req, res)) === false) {
            return;
        }

        // Get user by credentials
        const currentUser: UserType | null = await this.user.search({
            login: req.body.login as string,
            password: User.crypt(req.body.password),
        });

        if (currentUser === null) {
            res.status(StatusCodes.BAD_REQUEST).send({
                error: "You must specify a correct login and password couple in the body of your request",
            });
            return;
        }

        // Send token if credentials match
        let token = null;
        token = await this.token.saveOne();
        currentUser.tokenList.push(token._id.toString());
        // Add token in the list of user's
        await this.user.updateOne(currentUser);
        res.status(StatusCodes.OK).send({ token: token.token });
        return;
    }

    /**
     * Check if login & password are specify
     * @param req
     * @param res
     * @returns Boolean
     */
    private async checkHaveRequiredParameters(
        req: Request,
        res: Response
    ): Promise<Boolean> {
        // data from the token that is verified
        const noteNew = new UserValidator();
        noteNew.password = req.body.password;
        noteNew.login = req.body.login;

        // verify input parameters
        const errors = await validate(noteNew);
        if (errors.length) {
            res.status(StatusCodes.BAD_REQUEST).send(errors);
            return false;
        }

        return true;
    }
}

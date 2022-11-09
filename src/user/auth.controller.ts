import { validate } from "class-validator";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TokenRepository } from "../token/token.repository";
import { UserRepository } from "./user.repository";
import { UserType } from "./user.type";
import { UserValidator } from "./user.validator";

export class AuthenticationController {
    public userRepository: UserRepository = new UserRepository();
    public tokenRepository: TokenRepository = new TokenRepository();

    /**
     * Register an User
     * @param req
     * @param res
     * @returns
     */
    public async register(req: Request, res: Response) {
        if ((await this.checkHaveRequiredParameters(req, res)) === false) {
            return;
        }

        // Check login is not use
        if (this.userRepository.search({ login: req.body.login }) !== null) {
            res.status(StatusCodes.BAD_REQUEST).send({
                error: "Your username is invalid",
            });
            return;
        }

        // User's creation
        res.status(StatusCodes.CREATED).send(
            await this.userRepository.insertOne({
                ...req.body,
                tokenList: [],
                password: UserRepository.crypt(req.body.password),
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

        // Get User by credentials
        const currentUser: UserType | null = await this.userRepository.search({
            login: req.body.login as string,
            password: UserRepository.crypt(req.body.password),
        });

        if (currentUser === null) {
            res.status(StatusCodes.BAD_REQUEST).send({
                error: "You must specify a correct login and password couple in the body of your request",
            });
            return;
        }

        // Send TokenRepository if credentials match
        const tokenObject = await this.tokenRepository.saveOne();
        currentUser.tokenList.push(tokenObject._id.toString());
        // Add TokenRepository in the list of User's
        await this.userRepository.updateOne(currentUser);
        res.status(StatusCodes.OK).send({ token: tokenObject.token });
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
        // data from the TokenRepository that is verified
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

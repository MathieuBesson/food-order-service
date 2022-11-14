import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { TokenRepository } from "../src/token/token.repository";
import { UserRepository } from "../src/user/user.repository";
import { TokenType } from "../src/token/token.type";
import { ROLE, UserType } from "../src/user/user.type";

export async function checkAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
    necessaryRole: ROLE | null
) {
    // Si la route nécéssite pas auth => next()
    if (necessaryRole === null) {
        next();
        return false;
    }

    // ADMIN OU CLIENT => vérifier que le token existe
    if (!req.headers["authorization"]) {
        res.status(StatusCodes.FORBIDDEN)
            .send({ error: "No token in your request" })
            .end();
        return false;
    }

    // Récupéré le token et l'utilisateur lié
    const clientToken = req.headers["authorization"].split(" ")[1];
    const tokenRepository: TokenRepository = new TokenRepository();
    const userRepository: UserRepository = new UserRepository();
    const token: TokenType | null = await tokenRepository.search({
        token: clientToken,
    });

    if (token === null) {
        res.status(StatusCodes.FORBIDDEN)
            .send({ error: "The transmitted token is invalid" })
            .end();
        return false;
    }

    const user: UserType | null = await userRepository.search({
        token: token?.userId,
    });

    if (user === null) {
        res.status(StatusCodes.FORBIDDEN)
            .send({
                error: "The transmitted token is currently no longer valid",
            })
            .end();
        return false;
    }

    // Vérifier que l'user lié à bien le rôle attendu
    if (!user.roles.includes(necessaryRole)) {
        res.status(StatusCodes.FORBIDDEN)
            .send({
                error: "Access to this road is prohibited",
            })
            .end();
        return false;
    }

    // All is good
    next();
    return true;
}

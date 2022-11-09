import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { TokenRepository } from "../src/token/token.repository";

export async function checkAuthorization(req: Request, res: Response) {
    if (
        ["/auth/register", "/auth/token"].includes(req.url) == false &&
        !req.headers["authorization"]
    ) {
        res.status(StatusCodes.FORBIDDEN)
            .send({ error: "No token in your request" })
            .end();
        return false;
    }

    let token = "";
    if (req.headers["authorization"]) {
        token = req.headers["authorization"].split(" ")[1];
    }

    if ((await new TokenRepository().isTokenValide(token)) === false) {
        res.status(StatusCodes.FORBIDDEN)
            .send({ error: "The transmitted token is invalid" })
            .end();
        return false;
    }

    return true;
}

/**
 * TokenRepository authorization
 * @param app
 */
export async function authorizations(app: Express) {
    app.use(async (req, res, next) => {
        if (await checkAuthorization(req, res)) {
            next();
        }
    });
}

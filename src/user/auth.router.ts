import { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { AuthenticationController } from "./auth.controller";

export const authRouter = {
    addRoutes(app: Express) {
        // Authentification
        app.post("/auth/register", (req: Request, res: Response) =>
            new AuthenticationController().register(req, res)
        );
        app.post("/auth/token", (req: Request, res: Response) =>
            new AuthenticationController().generateToken(req, res)
        );
    },
};

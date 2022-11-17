import { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { RouteConfig } from "../../utils/router";
import { AuthenticationController } from "./auth.controller";

export const AuthRoutes: RouteConfig = {
    ressourceName: "auth",
    routes: [
        {
            path: "/register",
            method: "post",
            auth: null,
            controller: (req: Request, res: Response) =>
                new AuthenticationController().register(req, res),
        },
        {
            path: "/token",
            method: "post",
            auth: null,
            controller: (req: Request, res: Response) =>
                new AuthenticationController().generateToken(req, res),
        },
    ],
};

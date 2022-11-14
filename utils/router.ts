import { NextFunction, Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { ROLE } from "../src/user/user.type";
import { checkAuthorization } from "./authorization";

export type ControllerFunction = (req: Request, res: Response) => void;
export type oneRoute = {
    path: string;
    method: string;
    auth: ROLE | null;
    controller: ControllerFunction;
};
export type RouteConfig = {
    routes: oneRoute[];
    ressourceName: string;
};

export class Router {
    public static addRoutes(routeConfig: RouteConfig, app: Express) {
        const appMethods = Router.getShitHackRoute(app);

        routeConfig.routes.forEach((route) => {
            const completePath = `/${routeConfig.ressourceName}` + route.path;
            appMethods[route.method](
                completePath,
                (req: Request, res: Response, next: NextFunction) =>
                    checkAuthorization(req, res, next, route.auth),
                route.controller
            );
        });
    }

    public static getShitHackRoute(app: Express): {
        [key: string]: any;
    } {
        return {
            get: (path: string, ...controller: ControllerFunction[]) =>
                app.get(path, controller),
            post: (path: string, ...controller: ControllerFunction[]) =>
                app.post(path, controller),
            delete: (path: string, ...controller: ControllerFunction[]) =>
                app.delete(path, controller),
            put: (path: string, ...controller: ControllerFunction[]) =>
                app.put(path, controller),
        };
    }
}

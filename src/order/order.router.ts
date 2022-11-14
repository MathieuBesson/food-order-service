import { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { RouteConfig } from "../../utils/router";
import { ROLE } from "../user/user.type";
import { OrderController } from "./order.controller";

export const OrderRoutes: RouteConfig = {
    ressourceName: "orders",
    routes: [
        {
            path: "",
            method: "get",
            auth: ROLE.ADMIN,
            controller: (req: Request, res: Response) =>
                new OrderController().getAll(req, res),
        },
        {
            path: "/:id",
            method: "get",
            auth: ROLE.ADMIN,
            controller: (req: Request, res: Response) =>
                new OrderController().getOne(req, res),
        },
        {
            path: "",
            method: "post",
            auth: ROLE.CLIENT,
            controller: (req: Request, res: Response) =>
                new OrderController().insertOne(req, res),
        },
        {
            path: "/:id",
            method: "delete",
            auth: ROLE.CLIENT,
            controller: (req: Request, res: Response) =>
                new OrderController().deleteOne(req, res),
        },
    ],
};

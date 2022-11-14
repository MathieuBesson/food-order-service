import { Request, Response } from "express";
import { RouteConfig } from "../../utils/router";
import { ROLE } from "../user/user.type";
import { DishController } from "./dish.controller";

export const DishRoutes: RouteConfig = {
    ressourceName: "dishs",
    routes: [
        {
            path: "",
            method: "get",
            auth: null,
            controller: (req: Request, res: Response) =>
                new DishController().getAll(req, res),
        },
        {
            path: "/type",
            method: "get",
            auth: null,
            controller: (req: Request, res: Response) =>
                new DishController().getAllOrderByField(req, res, "type"),
        },
        {
            path: "/:id",
            method: "get",
            auth: null,
            controller: (req: Request, res: Response) =>
                new DishController().getOne(req, res),
        },
        {
            path: "",
            method: "post",
            auth: ROLE.ADMIN,
            controller: (req: Request, res: Response) =>
                new DishController().insertOne(req, res),
        },
        {
            path: "/:id",
            method: "delete",
            auth: ROLE.ADMIN,
            controller: (req: Request, res: Response) =>
                new DishController().deleteOne(req, res),
        },
        {
            path: "",
            method: "put",
            auth: ROLE.ADMIN,
            controller: (req: Request, res: Response) =>
                new DishController().updateOne(req, res),
        },
    ],
};

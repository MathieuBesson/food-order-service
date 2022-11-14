import { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { RouteConfig } from "../../utils/router";
import { ROLE } from "../user/user.type";
import { FoodController } from "./food.controller";

export const FoodRoutes: RouteConfig = {
    ressourceName: "foods",
    routes: [
        {
            path: "",
            method: "get",
            auth: null,
            controller: (req: Request, res: Response) =>
                new FoodController().getAll(req, res),
        },
        {
            path: "/type",
            method: "get",
            auth: null,
            controller: (req: Request, res: Response) =>
                new FoodController().getAllOrderByField(req, res, "type"),
        },
        {
            path: "/:id",
            method: "get",
            auth: null,
            controller: (req: Request, res: Response) =>
                new FoodController().getOne(req, res),
        },
        {
            path: "",
            method: "post",
            auth: ROLE.ADMIN,
            controller: (req: Request, res: Response) =>
                new FoodController().insertOne(req, res),
        },
        {
            path: "/:id",
            method: "delete",
            auth: ROLE.ADMIN,
            controller: (req: Request, res: any) =>
                new FoodController().deleteOne(req, res),
        },
        {
            path: "",
            method: "put",
            auth: ROLE.ADMIN,
            controller: (req: Request, res: Response) =>
                new FoodController().updateOne(req, res),
        },
    ],
};

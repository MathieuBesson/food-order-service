import { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { OrderController } from "./order.controller";

export const orderRouter = {
    addRoutes(app: Express) {
        // Orders
        app.get("/order", (req: Request, res: Response) =>
            new OrderController().getAll(req, res)
        );
        app.get("/order/:id", (req: Request, res: Response) =>
            new OrderController().getOne(req, res)
        );
        app.post("/order", (req: Request, res: Response) =>
            new OrderController().insertOne(req, res)
        );
        app.delete("/order/:id", (req: Request, res: Response) =>
            new OrderController().deleteOne(req, res)
        );
    },
};

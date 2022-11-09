import { Request, Response } from "express";
import { DishController } from "./dish.controller";
import { Express } from "express-serve-static-core";

export const dishRouter = {
    addRoutes(app: Express) {
        // Dishs
        app.get("/dish", (req: Request, res: Response) =>
            new DishController().getAll(req, res)
        );
        app.get("/dish/:id", (req: Request, res: Response) =>
            new DishController().getOne(req, res)
        );
        app.post("/dish", (req: Request, res: Response) =>
            new DishController().insertOne(req, res)
        );
        app.delete("/dish/:id", (req: Request, res: Response) =>
            new DishController().deleteOne(req, res)
        );
        app.put("/dish", (req: Request, res: Response) =>
            new DishController().updateOne(req, res)
        );
    },
};

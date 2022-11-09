import { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { FoodController } from "./food.controller";

export const foodRouter = {
    addRoutes(app: Express) {
        // Foods
        app.get("/food", (req: Request, res: Response) =>
            new FoodController().getAll(req, res)
        );
        app.get("/food/type", (req: Request, res: Response) =>
            new FoodController().getAllOrderByField(req, res, "type")
        );
        app.get("/food/:id", (req: Request, res: Response) =>
            new FoodController().getOne(req, res)
        );
        app.post("/food", (req: Request, res: Response) =>
            new FoodController().insertOne(req, res)
        );
        app.put("/food", (req: Request, res: Response) =>
            new FoodController().updateOne(req, res)
        );
        app.delete("/food/:id", (req: Request, res: any) =>
            new FoodController().deleteOne(req, res)
        );
    },
};

import { AuthenticationController } from "../controller/AuthenticationController";
import { DishController } from "../controller/DishController";
import { FoodController } from "../controller/FoodController";
import { NextFunction, Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { OrderController } from "../controller/OrderController";

export function routes(app: Express) {
    // Home
    app.get("/", (req: Request, res: Response) => {
        res.send("🏠");
    });

    // Authentification
    app.post("/auth/register", (req: Request, res: Response) =>
        new AuthenticationController().register(req, res)
    );
    app.post("/auth/token", (req: Request, res: Response) =>
        new AuthenticationController().generateToken(req, res)
    );

    // Foods
    app.get("/food", (req: Request, res: Response) =>
        new FoodController().getAll(req, res)
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
    app.put("/order", (req: Request, res: Response) =>
        new OrderController().updateOne(req, res)
    );
}

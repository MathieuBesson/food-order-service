import { ControllerAuthentication } from "../controller/controllerAuthentication";
import { ControllerDish } from "../controller/controllerDish";
import { ControllerFood } from "../controller/controllerFood";
import { NextFunction, Request, Response } from "express";
import { Express } from "express-serve-static-core";

export function routes(app: Express) {
    // Home
    app.get("/", (req: Request, res: Response) => {
        res.send("🏠");
    });

    // Authentification
    app.post("/auth/register", (req: Request, res: Response) =>
        new ControllerAuthentication().register(req, res)
    );
    app.post("/auth/token", (req: Request, res: Response) =>
        new ControllerAuthentication().generateToken(req, res)
    );

    // Foods
    app.get("/food", (req: Request, res: Response) =>
        new ControllerFood().getAll(req, res)
    );
    app.get("/food/:id", (req: Request, res: Response) =>
        new ControllerFood().getOne(req, res)
    );
    app.post("/food", (req: Request, res: Response) =>
        new ControllerFood().insertOne(req, res)
    );
    app.put("/food", (req: Request, res: Response) =>
        new ControllerFood().updateOne(req, res)
    );
    app.delete("/food/:id", (req: Request, res: any) =>
        new ControllerFood().deleteOne(req, res)
    );

    // Dishs
    app.get("/dish", (req: Request, res: Response) =>
        new ControllerDish().getAll(req, res)
    );
    app.get("/dish/:id", (req: Request, res: Response) =>
        new ControllerDish().getOne(req, res)
    );
    app.post("/dish", (req: Request, res: Response) =>
        new ControllerDish().insertOne(req, res)
    );
    app.delete("/dish/:id", (req: Request, res: Response) =>
        new ControllerDish().deleteOne(req, res)
    );
    app.put("/dish", (req: Request, res: Response) =>
        new ControllerDish().updateOne(req, res)
    );
}

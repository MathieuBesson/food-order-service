"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const AuthenticationController_1 = require("../controller/AuthenticationController");
const DishController_1 = require("../controller/DishController");
const FoodController_1 = require("../controller/FoodController");
function routes(app) {
    // Home
    app.get("/", (req, res) => {
        res.send("🏠");
    });
    // Authentification
    app.post("/auth/register", (req, res) =>
        new AuthenticationController_1.AuthenticationController().register(
            req,
            res
        )
    );
    app.post("/auth/token", (req, res) =>
        new AuthenticationController_1.AuthenticationController().generateToken(
            req,
            res
        )
    );
    // Foods
    app.get("/food", (req, res) =>
        new FoodController_1.FoodController().getAll(req, res)
    );
    app.get("/food/:id", (req, res) =>
        new FoodController_1.FoodController().getOne(req, res)
    );
    app.post("/food", (req, res) =>
        new FoodController_1.FoodController().insertOne(req, res)
    );
    app.put("/food", (req, res) =>
        new FoodController_1.FoodController().updateOne(req, res)
    );
    app.delete("/food/:id", (req, res) =>
        new FoodController_1.FoodController().deleteOne(req, res)
    );
    // Dishs
    app.get("/dish", (req, res) =>
        new DishController_1.DishController().getAll(req, res)
    );
    app.get("/dish/:id", (req, res) =>
        new DishController_1.DishController().getOne(req, res)
    );
    app.post("/dish", (req, res) =>
        new DishController_1.DishController().insertOne(req, res)
    );
    app.delete("/dish/:id", (req, res) =>
        new DishController_1.DishController().deleteOne(req, res)
    );
    app.put("/dish", (req, res) =>
        new DishController_1.DishController().updateOne(req, res)
    );
}
exports.routes = routes;

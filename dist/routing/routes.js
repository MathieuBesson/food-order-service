"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const controllerAuthentication_1 = require("../controller/controllerAuthentication");
const controllerDish_1 = require("../controller/controllerDish");
const controllerFood_1 = require("../controller/controllerFood");
function routes(app) {
    // Home
    app.get("/", (req, res) => {
        res.send("🏠");
    });
    // Authentification
    app.post("/auth/register", (req, res) => new controllerAuthentication_1.ControllerAuthentication().register(req, res));
    app.post("/auth/token", (req, res) => new controllerAuthentication_1.ControllerAuthentication().generateToken(req, res));
    // Foods
    app.get("/food", (req, res) => new controllerFood_1.ControllerFood().getAll(req, res));
    app.get("/food/:id", (req, res) => new controllerFood_1.ControllerFood().getOne(req, res));
    app.post("/food", (req, res) => new controllerFood_1.ControllerFood().insertOne(req, res));
    app.put("/food", (req, res) => new controllerFood_1.ControllerFood().updateOne(req, res));
    app.delete("/food/:id", (req, res) => new controllerFood_1.ControllerFood().deleteOne(req, res));
    // Dishs
    app.get("/dish", (req, res) => new controllerDish_1.ControllerDish().getAll(req, res));
    app.get("/dish/:id", (req, res) => new controllerDish_1.ControllerDish().getOne(req, res));
    app.post("/dish", (req, res) => new controllerDish_1.ControllerDish().insertOne(req, res));
    app.delete("/dish/:id", (req, res) => new controllerDish_1.ControllerDish().deleteOne(req, res));
    app.put("/dish", (req, res) => new controllerDish_1.ControllerDish().updateOne(req, res));
}
exports.routes = routes;

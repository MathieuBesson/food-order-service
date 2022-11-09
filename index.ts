import express, { Router } from "express";
import { connexionBdd } from "./utils/bdd";
import { authorizations } from "./utils/authorization";
import { performances } from "./utils/performance";
import { configurations } from "./utils/configurations";
import { dishRouter } from "./src/dish/dish.router";
import { foodRouter } from "./src/food/food.router";
import { orderRouter } from "./src/order/order.router";
import { authRouter } from "./src/user/auth.router";

const app = express();

configurations(app);
authorizations(app);
performances(app);

[dishRouter, foodRouter, orderRouter, authRouter].map((router) =>
    router.addRoutes(app)
);

// Serveur listening
app.listen(3000, () => "Serveur listening on port :3000");

// BDD connexion
connexionBdd();

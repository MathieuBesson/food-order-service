import express, { Router as RouterExpress } from "express";
import { connexionBdd } from "./utils/bdd";
import { performances } from "./utils/performance";
import { configurations } from "./utils/configurations";
import { DishRoutes } from "./src/dish/dish.router";
import { FoodRoutes } from "./src/food/food.router";
import { OrderRoutes } from "./src/order/order.router";
import { AuthRoutes } from "./src/user/auth.router";
import { Router } from "./utils/router";

const app = express();

const routes = [DishRoutes, FoodRoutes, OrderRoutes, AuthRoutes];

configurations(app);
performances(app);

routes.map((route) => Router.addRoutes(route, app));

// Serveur listening
app.listen(3000, () => "Serveur listening on port :3000");

// BDD connexion
connexionBdd();

import express, { Router as RouterExpress } from "express";
import { connexionBdd } from "./utils/bdd";
import { performances } from "./utils/performance";
import { configurations } from "./utils/configurations";
import { DishRoutes } from "./src/dish/dish.router";
import { FoodRoutes } from "./src/food/food.router";
import { OrderRoutes } from "./src/order/order.router";
import { AuthRoutes } from "./src/user/auth.router";
import { Router } from "./utils/router";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

const routes = [DishRoutes, FoodRoutes, OrderRoutes, AuthRoutes];

configurations(app);
performances(app);

routes.map((route) => Router.addRoutes(route, app));

// Serveur listening
app.listen(process.env.SERVER_PORT, () =>
    console.log(`Serveur listening on port :${process.env.SERVER_PORT}`)
);

// BDD connexion
connexionBdd();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(YAML.load("./swagger.yaml")));

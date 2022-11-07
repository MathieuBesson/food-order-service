import express from "express";
import { connexionBdd } from "./utils/bdd";
import { authorizations } from "./utils/authorization";
import { performances } from "./utils/performance";
import { configurations } from "./configurations/configurations";
import { routes } from "./routing/routes";

const app = express();

configurations(app);
authorizations(app);
performances(app);
routes(app);

// Serveur listening
app.listen(3000, () => "Serveur listening on port :3000");

// BDD connexion
connexionBdd();

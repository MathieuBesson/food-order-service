"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bdd_1 = require("./utils/bdd");
const authorization_1 = require("./utils/authorization");
const performance_1 = require("./utils/performance");
const configurations_1 = require("./configurations/configurations");
const routes_1 = require("./routing/routes");
const app = (0, express_1.default)();
(0, configurations_1.configurations)(app);
(0, authorization_1.authorizations)(app);
(0, performance_1.performances)(app);
(0, routes_1.routes)(app);
// Serveur listening
app.listen(3000, () => "Serveur listening on port :3000");
// BDD connexion
(0, bdd_1.connexionBdd)();

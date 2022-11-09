import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { Express } from "express-serve-static-core";

export function configurations(app: Express) {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    dotenv.config();
}

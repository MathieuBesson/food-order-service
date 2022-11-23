import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { Express } from "express-serve-static-core";
import cors from "cors";

export function configurations(app: Express) {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    app.use((req: Request, res: Response, next: NextFunction) => {
        // Website you wish to allow to connect
        // res.setHeader("Access-Control-Allow-Origin", "*");

        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Methods",
            "GET,PUT, PATCH,POST,DELETE"
        );
        res.header("Access-Control-Allow-Headers", "Content-Type");

        // Request headers you wish to allow
        // res.setHeader(
        //     "Access-Control-Allow-Headers",
        //     "X-Requested-With,content-type"
        // );

        next();
    });

    dotenv.config();
}

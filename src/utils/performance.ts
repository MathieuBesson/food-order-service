import { Request, Response } from "express";
import { Express } from "express-serve-static-core";

const getDurationInMilliseconds = (start: [number, number]) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export function timeRequestMeasurement(req: Request, res: Response) {
    console.log(`${req.method} ${req.originalUrl} [STARTED]`);
    const start = process.hrtime();

    res.on("finish", () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        console.log(
            `${req.method} ${
                req.originalUrl
            } [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`
        );
    });

    res.on("close", () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        console.log(
            `${req.method} ${
                req.originalUrl
            } [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`
        );
    });
}

/**
 * Time request measurement
 * @param app
 */
export function performances(app: Express) {
    app.use((req, res, next) => {
        timeRequestMeasurement(req, res);
        next();
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performances = exports.timeRequestMeasurement = void 0;
const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
function timeRequestMeasurement(req, res) {
    console.log(`${req.method} ${req.originalUrl} [STARTED]`);
    const start = process.hrtime();
    res.on("finish", () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        console.log(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`);
    });
    res.on("close", () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`);
    });
}
exports.timeRequestMeasurement = timeRequestMeasurement;
/**
 * Time request measurement
 * @param app
 */
function performances(app) {
    app.use((req, res, next) => {
        timeRequestMeasurement(req, res);
        next();
    });
}
exports.performances = performances;

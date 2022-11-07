"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizations = exports.checkAuthorization = void 0;
const http_status_codes_1 = require("http-status-codes");
const token_1 = require("../models/token");
function checkAuthorization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (["/auth/register", "/auth/token"].includes(req.url) == false &&
            !req.headers["authorization"]) {
            res.status(http_status_codes_1.StatusCodes.FORBIDDEN)
                .send({ error: "No token in your request" })
                .end();
            return false;
        }
        let token = "";
        if (req.headers["authorization"]) {
            token = req.headers["authorization"].split(" ")[1];
        }
        // const token = req.headers['authorization'].split(" ")[1];
        if ((yield new token_1.Token().isTokenValide(token)) === false) {
            res.status(http_status_codes_1.StatusCodes.FORBIDDEN)
                .send({ error: "The transmitted token is invalid" })
                .end();
            return false;
        }
        return true;
    });
}
exports.checkAuthorization = checkAuthorization;
/**
 * Token authorization
 * @param app
 */
function authorizations(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (yield checkAuthorization(req, res)) {
                next();
            }
        }));
    });
}
exports.authorizations = authorizations;

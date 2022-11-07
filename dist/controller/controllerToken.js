"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerToken = void 0;
const baseControllerApi_1 = require("./baseControllerApi");
const token_1 = require("../models/token");
class ControllerToken extends baseControllerApi_1.BaseControllerApi {
    constructor() {
        super(...arguments);
        this.model = new token_1.Token();
    }
}
exports.ControllerToken = ControllerToken;

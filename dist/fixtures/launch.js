"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Food_1 = require("../models/Food");
const Dish_1 = require("../models/Dish");
const data_js_1 = require("./data.js");
const bdd_1 = require("../utils/bdd");
const dotenv = __importStar(require("dotenv"));
const User_1 = require("../models/User");
const Token_1 = require("../models/Token");
const Order_1 = require("../models/Order");
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, bdd_1.connexionBdd)();
        yield insertFixture();
    });
}
function insertFixture() {
    return __awaiter(this, void 0, void 0, function* () {
        // Foods
        const food = new Food_1.Food();
        yield food.modelMongo.deleteMany({});
        const foodsSave = yield food.modelMongo.insertMany(data_js_1.foods);
        // Dishs
        const dish = new Dish_1.Dish();
        yield dish.modelMongo.deleteMany({});
        const dishsMap = data_js_1.dishs.map((currentDish) => {
            return Object.assign(Object.assign({}, currentDish), { foods: currentDish.foods.map((currentFood) => {
                    const newFood = Object.assign(Object.assign({}, currentFood), { _id: foodsSave[currentFood.fixtureId]._id.toString() });
                    if (newFood.hasOwnProperty("fixtureId"))
                        delete newFood.fixtureId;
                    return newFood;
                }) });
        });
        const dishsSave = yield dish.modelMongo.insertMany(dishsMap);
        // Orders
        const order = new Order_1.Order();
        yield order.modelMongo.deleteMany({});
        const ordersMap = data_js_1.orders.map((currentOrder) => {
            return Object.assign(Object.assign({}, currentOrder), { dishs: currentOrder.dishs.map((currentDish) => {
                    const newOrder = Object.assign(Object.assign({}, currentDish), { _id: dishsSave[currentDish.fixtureId]._id.toString() });
                    if (newOrder.hasOwnProperty("fixtureId"))
                        delete newOrder.fixtureId;
                    return newOrder;
                }) });
        });
        yield order.modelMongo.insertMany(ordersMap);
        // Users
        const user = new User_1.User();
        yield user.modelMongo.deleteMany({});
        const userListe = [];
        // Tokens
        const token = new Token_1.Token();
        yield token.modelMongo.deleteMany({});
        let tokenList = [];
        data_js_1.users.forEach(() => {
            // Generate tokens
            tokenList.push({
                token: Token_1.Token.generateOne(),
                date: new Date(),
            });
        });
        const tokensSauvegarde = yield token.modelMongo.insertMany(tokenList);
        data_js_1.users.forEach((currentUser, key) => {
            // Generate users
            userListe.push(Object.assign(Object.assign({}, currentUser), { tokenList: [tokensSauvegarde[key]._id.toString()], password: User_1.User.crypt(currentUser.password) }));
        });
        yield user.modelMongo.insertMany(userListe);
        console.log("Fixtures jouées !");
        process.exit(1);
    });
}
main().catch((err) => console.log(err));

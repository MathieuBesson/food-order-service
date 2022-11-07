import { Food } from "../models/Food";
import { Dish } from "../models/Dish";
import { foods, dishs, users, orders } from "./data.js";
import { connexionBdd } from "../utils/bdd";
import * as dotenv from "dotenv";
import { User } from "../models/User";
import { Token } from "../models/Token";
import { TokenType } from "../types/TokenType";
import { UserType } from "../types/UserType";
import { Order } from "../models/Order";
dotenv.config();

async function main() {
    await connexionBdd();
    await insertFixture();
}

async function insertFixture() {
    // Foods
    const food: Food = new Food();
    await food.modelMongo.deleteMany({});
    const foodsSave = await food.modelMongo.insertMany(foods);

    // Dishs
    const dish: Dish = new Dish();
    await dish.modelMongo.deleteMany({});
    const dishsMap = dishs.map((currentDish) => {
        return {
            ...currentDish,
            foods: currentDish.foods.map((currentFood) => {
                const newFood: {
                    _id?: string;
                    fixtureId?: string | number;
                    quantity: number;
                } = {
                    ...currentFood,
                    _id: foodsSave[currentFood.fixtureId]._id.toString(),
                };
                if (newFood.hasOwnProperty("fixtureId"))
                    delete newFood.fixtureId;

                return newFood;
            }),
        };
    });
    const dishsSave = await dish.modelMongo.insertMany(dishsMap);

    // Orders
    const order: Order = new Order();
    await order.modelMongo.deleteMany({});
    const ordersMap = orders.map((currentOrder) => {
        return {
            ...currentOrder,
            dishs: currentOrder.dishs.map((currentDish) => {
                const newOrder: {
                    _id?: string;
                    fixtureId?: string | number;
                    quantity: number;
                } = {
                    ...currentDish,
                    _id: dishsSave[currentDish.fixtureId]._id.toString(),
                };
                if (newOrder.hasOwnProperty("fixtureId"))
                    delete newOrder.fixtureId;

                return newOrder;
            }),
        };
    });
    await order.modelMongo.insertMany(ordersMap);

    // Users
    const user: User = new User();
    await user.modelMongo.deleteMany({});
    const userListe: UserType[] = [];

    // Tokens
    const token: Token = new Token();
    await token.modelMongo.deleteMany({});
    let tokenList: TokenType[] = [];

    users.forEach(() => {
        // Generate tokens
        tokenList.push({
            token: Token.generateOne(),
            date: new Date(),
        });
    });
    const tokensSauvegarde = await token.modelMongo.insertMany(tokenList);

    users.forEach((currentUser, key) => {
        // Generate users
        userListe.push({
            ...currentUser,
            tokenList: [tokensSauvegarde[key]._id.toString()],
            password: User.crypt(currentUser.password),
        });
    });
    await user.modelMongo.insertMany(userListe);

    console.log("Fixtures jouées !");
    process.exit(1);
}

main().catch((err) => console.log(err));

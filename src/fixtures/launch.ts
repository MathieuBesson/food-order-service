import { Food } from "../models/food";
import { Dish } from "../models/dish";
import { foods, dishs, users } from "./data.js";
import { connexionBdd } from "../utils/bdd";
import * as dotenv from "dotenv";
import { User } from "../models/user";
import { Token } from "../models/token";
import { TokenType } from "../types/tokenType";
import { UserType } from "../types/userType";
import { DishType } from "../types/dishType";
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
            foods: currentDish.foods.map((foodCourant) => {
                const newFood: {
                    _id?: string;
                    fixtureId?: string | number;
                    quantity: number;
                } = {
                    ...foodCourant,
                    _id: foodsSave[foodCourant.fixtureId]._id.toString(),
                };
                if (newFood.hasOwnProperty("fixtureId"))
                    delete newFood.fixtureId;

                return newFood;
            }),
        };
    });
    await dish.modelMongo.insertMany(dishsMap);

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

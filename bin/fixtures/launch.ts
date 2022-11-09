import { foods, dishs, users, orders } from "./data.js";
import { connexionBdd } from "../../utils/bdd";
import * as dotenv from "dotenv";
import { FoodRepository } from "../../src/food/food.repository.js";
import { DishRepository } from "../../src/dish/dish.repository.js";
import { OrderRepository } from "../../src/order/order.repository.js";
import { TokenRepository } from "../../src/token/token.repository.js";
import { TokenType } from "../../src/token/token.type.js";
import { UserRepository } from "../../src/user/user.repository.js";
import { UserType } from "../../src/user/user.type.js";

async function main() {
    dotenv.config();
    await connexionBdd();
    await insertFixture();
}

async function insertFixture() {
    // Foods
    const foodRepository: FoodRepository = new FoodRepository();
    await foodRepository.schema.deleteMany({});
    const foodsSave = await foodRepository.schema.insertMany(foods);

    // Dishs
    const dishRepository: DishRepository = new DishRepository();
    await dishRepository.schema.deleteMany({});
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
    const dishsSave = await dishRepository.schema.insertMany(dishsMap);

    // Orders
    const orderRepository: OrderRepository = new OrderRepository();
    await orderRepository.schema.deleteMany({});
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
    await orderRepository.schema.insertMany(ordersMap);

    // Users
    const userRepository: UserRepository = new UserRepository();
    await userRepository.schema.deleteMany({});
    const UserListe: UserType[] = [];

    // Tokens
    const tokenRepository: TokenRepository = new TokenRepository();
    await tokenRepository.schema.deleteMany({});
    let tokenList: TokenType[] = [];

    users.forEach(() => {
        // Generate tokens
        tokenList.push({
            token: TokenRepository.generateOne(),
            date: new Date(),
        });
    });
    const tokensSauvegarde = await tokenRepository.schema.insertMany(tokenList);

    users.forEach((currentUser, key) => {
        // Generate Users
        UserListe.push({
            ...currentUser,
            tokenList: [tokensSauvegarde[key]._id.toString()],
            password: UserRepository.crypt(currentUser.password),
        });
    });
    await userRepository.schema.insertMany(UserListe);

    console.log("Fixtures jouées !");
    process.exit(1);
}

main().catch((err) => console.log(err));

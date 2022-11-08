import { BaseModel } from "../models/BaseModel";
import { BaseControllerApi } from "./BaseControllerApi";
import { OrderType } from "../types/OrderType";
import { Order } from "../models/Order";
import { Request, Response } from "express";
import { Dish } from "../models/Dish";
import { DishType } from "../types/DishType";

export class OrderController extends BaseControllerApi<OrderType> {
    public model: BaseModel<OrderType> = new Order();

    public async insertOne(req: Request, res: Response) {
        if ((await this.isQuantityUnavailable(req, res)) === false) {
            return;
        }
        await this.decreaseFoodAmount(req);
        await super.insertOne(req, res);
    }

    protected async isQuantityUnavailable(
        req: Request,
        res: Response
    ): Promise<Boolean> {
        let errors: string[] = [];
        const dish: Dish = new Dish();
        req.body.dishs.forEach(
            async (dishData: { _id: string; quantity: number }) => {
                const dishObject: DishType | null =
                    await dish.getOneWithDisponibility(dishData._id);

                if (
                    dishObject !== null &&
                    dishData.quantity > dishObject.quantity
                ) {
                    let errorMessage =
                        dishObject.quantity > 0
                            ? `Only ${dishObject.quantity} ${dishObject.name} available`
                            : `The ${dishObject.name} dish is no longer available`;

                    errors.push(errorMessage);
                }
            }
        );

        if (errors.length > 0) {
            this.sendBadRequestError(errors, "ValidationData", res);
            return false;
        }

        return true;
    }

    private async decreaseFoodAmount(req: Request) {
        const dish: Dish = new Dish();
        req.body.dishs.forEach(
            async (dishData: { _id: string; quantity: number }) => {
                const dishObject: DishType | null = await dish.getOne(
                    dishData._id
                );
                if (dishObject !== null) {
                    dish.decreaseFoodAmount(dishObject);
                }
            }
        );
    }
}

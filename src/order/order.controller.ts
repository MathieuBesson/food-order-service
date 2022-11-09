import { BaseRepository } from "../base/base.model";
import { OrderType } from "./order.type";
import { OrderRepository } from "./order.repository";
import { Request, Response } from "express";
import { DishRepository } from "../dish/dish.repository";
import { DishType } from "../dish/dish.type";
import { StatusCodes } from "http-status-codes";
import { BaseControllerApi } from "../base/base.controller.api";

export class OrderController extends BaseControllerApi<OrderType> {
    public model: BaseRepository<OrderType> = new OrderRepository();

    public async insertOne(req: Request, res: Response) {
        if ((await this.areValidParameters(req, res)) === false) {
            return;
        }

        if ((await this.isQuantityUnavailable(req, res)) === false) {
            return;
        }

        res.status(StatusCodes.CREATED).send(
            await this.model.insertOne(req.body)
        );

        await new OrderRepository().decreaseFoodAmount(req.body.dishs);
    }

    protected async isQuantityUnavailable(
        req: Request,
        res: Response
    ): Promise<Boolean> {
        let errors: string[] = [];
        const dishRepository: DishRepository = new DishRepository();
        req.body.dishs.forEach(
            async (dishData: { _id: string; quantity: number }) => {
                const dishObject: DishType | null =
                    await dishRepository.getOneWithDisponibility(dishData._id);

                if (
                    dishObject !== null &&
                    dishData.quantity > dishObject.disponibility
                ) {
                    errors.push(
                        this.getErrorMessageQuantity(
                            dishObject.disponibility,
                            dishObject.name
                        )
                    );
                }
            }
        );

        if (errors.length > 0) {
            this.sendBadRequestError(errors, "ValidationData", res);
            return false;
        }

        return true;
    }

    protected getErrorMessageQuantity(quantity: number, propertyName: string) {
        return quantity > 0
            ? `Only ${quantity} ${propertyName} available`
            : `The ${propertyName} dish is no longer available`;
    }
}

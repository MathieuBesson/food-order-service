import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BaseModel } from "../models/BaseModel";
import { Dish } from "../models/Dish";
import { DishType } from "../types/DishType";
import { BaseControllerApi } from "./BaseControllerApi";

export class DishController extends BaseControllerApi<DishType> {
    public model: Dish = new Dish();

    public async getOne(req: Request, res: Response) {
        res.status(StatusCodes.CREATED).send(
            await this.model.getOneWithDisponibility(req.params.id)
        );
    }
}

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BaseControllerApi } from "../base/base.controller.api";
import { DishRepository } from "./dish.repository";
import { DishType } from "./dish.type";

export class DishController extends BaseControllerApi<DishType> {
    public model: DishRepository = new DishRepository();

    public async getOne(req: Request, res: Response) {
        res.status(StatusCodes.CREATED).send(
            await this.model.getOneWithDisponibility(req.params.id)
        );
    }

    public async getAll(req: Request, res: Response) {
        res.status(StatusCodes.CREATED).send(
            await this.model.getAllWithDisponibilities()
        );
    }
}

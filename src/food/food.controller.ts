import { FoodRepository } from "./food.repository";
import { BaseRepository } from "../base/base.model";
import { FoodType } from "./food.type";
import { BaseControllerApi } from "../base/base.controller.api";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class FoodController extends BaseControllerApi<FoodType> {
    public model: FoodRepository = new FoodRepository();
}

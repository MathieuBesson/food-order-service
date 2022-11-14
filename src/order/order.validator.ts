import { Type } from "class-transformer";
import { IsArray, IsBoolean, ValidateNested } from "class-validator";
import { OrderType } from "./order.type";
import "reflect-metadata";
import { BaseValidator } from "../base/base.validator";
import { DishOrderValidator } from "../dish/dish.validator";
import { DishOrderType } from "../dish/dish.type";

export class OrderValidator
    extends BaseValidator
    implements Pick<OrderType, "dishs">
{
    @IsArray()
    @ValidateNested()
    @Type(() => DishOrderValidator)
    dishs: DishOrderType[] = [];
}

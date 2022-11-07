import { BaseModel } from "../models/BaseModel";
import { BaseControllerApi } from "./BaseControllerApi";
import { OrderType } from "../types/OrderType";
import { Order } from "../models/Order";

export class OrderController extends BaseControllerApi<OrderType> {
    public model: BaseModel<OrderType> = new Order();
}

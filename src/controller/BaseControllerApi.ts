import { BaseModel, BaseValidator } from "../models/BaseModel";
import { InterfaceControllerApi } from "./InterfaceControllerApi";
import { StatusCodes } from "http-status-codes";
import { BaseType } from "../types/BaseType";
import { Request, Response } from "express";
import { ValidationError } from "class-validator";

export class BaseControllerApi<Type extends BaseType>
    implements InterfaceControllerApi<Type>
{
    public model!: BaseModel<Type>;

    public async getAll(req: Request, res: Response) {
        res.status(StatusCodes.CREATED).send(await this.model.getAll());
    }

    public async getOne(req: Request, res: Response) {
        res.status(StatusCodes.CREATED).send(
            await this.model.getOne(req.params.id)
        );
    }

    public async insertOne(req: Request, res: Response) {
        if ((await this.areParametersValid(req, res)) === false) {
            return;
        }

        res.status(StatusCodes.CREATED).send(
            await this.model.insertOne(req.body)
        );
    }

    public async updateOne(req: Request, res: Response) {
        if ((await this.areParametersValid(req, res)) === false) {
            return;
        }

        res.status(StatusCodes.CREATED).send(
            await this.model.updateOne(req.body)
        );
    }

    public async deleteOne(req: Request, res: Response) {
        res.status(StatusCodes.NO_CONTENT).send(
            await this.model.deleteOne(req.params.id)
        );
    }

    protected async areParametersValid(
        req: Request,
        res: Response
    ): Promise<Boolean> {
        const errors = await BaseValidator.getErrorsDataTypeIncorrect(
            req.body,
            this.model.typeValidator
        );
        if (errors.length > 0) {
            this.sendBadRequestError(errors, "ValidationData", res);
            return false;
        }

        return true;
    }

    protected sendBadRequestError(
        errors: ValidationError[] | string[],
        type: string,
        res: Response
    ) {
        res.status(StatusCodes.BAD_REQUEST).send({
            status: StatusCodes.BAD_REQUEST,
            type,
            errors,
        });
    }
}

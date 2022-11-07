import { validate, ValidationError } from "class-validator";
import { Model } from "mongoose";
import { BaseType } from "../types/BaseType";
import { ModelInterface } from "./ModelInterface";

export abstract class BaseModel<Type extends BaseType>
    implements ModelInterface<Type>
{
    public modelMongo!: Model<Type>;
    public typeValidator!: BaseValidator;

    public async getAll() {
        return await this.modelMongo.find();
    }

    public async search(object: any) {
        return await this.modelMongo.findOne(object);
    }

    public async getOne(id: string) {
        return await this.modelMongo.findOne({ _id: id });
    }

    public async insertOne(body: Type) {
        const object = new this.modelMongo({
            ...body,
            date: new Date(),
        });
        return await object.save();
    }

    public async updateOne(body: Type) {
        const object = await this.modelMongo.findOne({ _id: body._id });
        return await object?.updateOne(body);
    }

    public async deleteOne(id: string) {
        return await this.modelMongo.deleteOne({ name: id });
    }
}

export class BaseValidator {
    constructor() {}

    public static async getErrorsDataTypeIncorrect(
        data: any,
        dataValidator: any
    ): Promise<ValidationError[] | string[]> {
        const attributes = Object.getOwnPropertyNames(dataValidator);

        // Errors don't have required parameters
        const errorDontHaveRequiredParameters =
            this.getErrorDontHaveRequiredParameters(data, attributes);
        if (errorDontHaveRequiredParameters.length > 0) {
            return errorDontHaveRequiredParameters;
        }

        // Insert each data in validator
        attributes.forEach((attribute) => {
            dataValidator[attribute] = data[attribute];
        });

        // Verify input parameters
        const errors = await validate(dataValidator);
        if (errors.length) {
            return errors;
        }

        return [];
    }

    private static getErrorDontHaveRequiredParameters(
        userData: any,
        attributes: string[]
    ): string[] {
        let errors: string[] = [];
        for (const attribute of attributes) {
            if (!userData.hasOwnProperty(attribute)) {
                errors.push(
                    `The ${attribute} attribute should be present in the passed data`
                );
            }
        }

        return errors;
    }
}

import { plainToClassFromExist } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export abstract class BaseValidator {
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

        // Populate validator
        dataValidator = plainToClassFromExist(dataValidator, data);

        // Verify input parameters
        const errors = await validate(dataValidator);
        if (errors.length) {
            return errors;
        }

        return [];
    }

    private static getErrorDontHaveRequiredParameters(
        UserData: any,
        attributes: string[]
    ): string[] {
        let errors: string[] = [];
        for (const attribute of attributes) {
            if (!UserData.hasOwnProperty(attribute)) {
                errors.push(
                    `The ${attribute} attribute should be present in the passed data`
                );
            }
        }

        return errors;
    }
}

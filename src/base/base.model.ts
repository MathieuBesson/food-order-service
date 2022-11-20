import { Model } from "mongoose";
import { RepositoryInterface } from "../../interfaces/interface.repository";
import { BaseType } from "./base.type";
import { BaseValidator } from "./base.validator";

export abstract class BaseRepository<Type extends BaseType>
    implements RepositoryInterface<Type>
{
    public schema!: Model<Type>;
    public typeValidator!: BaseValidator;

    public async getAll() {
        return await this.schema.find();
    }

    public async search(object: any) {
        return await this.schema.findOne(object);
    }

    public async getOne(id: string) {
        return await this.schema.findOne({ _id: id });
    }

    public async insertOne(body: Type) {
        const object = new this.schema({
            ...body,
            date: new Date(),
        });
        return await object.save();
    }

    public async updateOne(body: Type) {
        const object = await this.schema.findOne({ _id: body._id });
        return await object?.updateOne(body);
    }

    public async deleteOne(id: string) {
        return await this.schema.deleteOne({ _id: id });
    }

    public async getAllOrderByField(field: string) {
        const objectsRequested: any[] = await this.schema
            .find()
            .sort({ [field]: 1 })
            .lean();

        const objectsOrdered: any[] = [];

        objectsRequested.forEach((objectRequested) => {
            let idOfType = null;
            objectsOrdered.forEach((objectOrdered, key) => {
                if (objectRequested[field] === objectOrdered[field]) {
                    idOfType = key;
                }
            });

            if (idOfType !== null) {
                objectsOrdered[idOfType].items.push(objectRequested);
            } else {
                objectsOrdered.push({
                    [field]: objectRequested[field],
                    items: [objectRequested],
                });
            }
        });

        return objectsOrdered;
    }
}

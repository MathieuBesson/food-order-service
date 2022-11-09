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
        return await this.schema.deleteOne({ name: id });
    }
}

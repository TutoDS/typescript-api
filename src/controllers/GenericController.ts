import { Context } from 'koa';
import { Model, Document } from 'mongoose';
/**
 * Generic GenericController
 *
 * This controller is used on most common queries, like:
 * getAll; getOneById; getOneAndDelete; getOneAndUpdate;
 *
 */
export default class GenericController {
	/**
	 * Model used on queries
	 */
	private model: Model<Document>;

	/**
	 * Constructor Method
	 *
	 * @param model model used on queries
	 */
	constructor(model: Model<Document>) {
		this.model = model;
	}

	/**
	 * Method to get all results on database
	 */
	public async getAll(ctx: Context, next: () => Promise<any>) {
		try {
			const allData = await this.model.find({});

			ctx.status = 200;
			ctx.body = allData;
		} catch (error) {
			ctx.throw(500, 'teste!');
		}
	}

	public getByID(ctx: Context, next: () => Promise<any>) {
		const id = ctx.params.id;

		this.model.findOne({ _id: id }).then(
			(success) => {
				ctx.status = 200;
				ctx.body = success;
			},
			(error) => {
				ctx.status = 400;
				ctx.body = error;
			},
		);

		next();
	}
}

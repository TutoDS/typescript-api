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
		this.model = undefined;
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
			ctx.throw(500, error);
		}
	}

	public async getByID(ctx: Context, next: () => Promise<any>) {
		try {
			const { id } = ctx.params;

			const founded = await this.model.findOne({ _id: id });

			if (Object.keys(founded).length == 0) ctx.throw(404, 'Not Found');

			ctx.status = 200;
			ctx.body = founded;
		} catch (catchError) {
			ctx.throw(catchError);
		}

		next();
	}
}

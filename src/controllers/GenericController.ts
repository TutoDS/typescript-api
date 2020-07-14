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
	 * Method to insert a new record on database
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async create(ctx: Context) {
		try {
			const { body } = ctx.request.body;

			const newModel = await new this.model(body).save();

			if (newModel) {
				ctx.status = 200;
				ctx.body = newModel;
			} else {
				ctx.throw(400, `Error on create ${this.model.modelName}`);
			}
		} catch (error) {
			ctx.throw(500, error);
		}
	}

	/**
	 * Method to get all results on database
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async getAll(ctx: Context) {
		try {
			const allData = await this.model.find({});

			ctx.status = 200;
			ctx.body = allData;
		} catch (error) {
			ctx.throw(500, error);
		}
	}

	/**
	 * Method to get one result by id on database
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async getByID(ctx: Context) {
		try {
			const { id } = ctx.params;

			const founded = await this.model.findOne({ _id: id });

			if (Object.keys(founded).length == 0)
				ctx.throw(404, `${this.model.modelName} not found`);

			ctx.status = 200;
			ctx.body = founded;
		} catch (catchError) {
			let message = catchError;
			let code = 500;

			if (catchError.kind == 'ObjectId') {
				message = `${this.model.modelName} not found`;
				code = 404;
			}

			ctx.throw(code || 500, message || catchError);
		}
	}

	/**
	 * Method to get one and update with new data
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async getOneAndUpdate(ctx: Context) {
		try {
			const { id } = ctx.params;
			const { body } = ctx.request.body;

			const founded = await this.model.findOne({ _id: id });

			// Record exists
			if (founded) {
				const updated = await founded.updateOne(body, {
					runValidators: true,
					new: true,
				});

				ctx.body = updated;
				ctx.status = 200;
			} else {
				ctx.throw(404, `${this.model.modelName} not found!`);
			}
		} catch (error) {
			ctx.throw(500, error);
		}
	}
}

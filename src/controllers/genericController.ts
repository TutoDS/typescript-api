/**
 * Generic GenericController
 *
 * This controller is used on most common queries, like:
 * getAll; getOneById; getOneAndDelete; getOneAndUpdate;
 *
 */
export class GenericController {
	/**
	 * Model used on queries
	 */
	private model: any;

	/**
	 * Constructor Method
	 *
	 * @param model model used on queries
	 */
	constructor(model: any) {
		this.model = model
	}

	/**
	 * Method to get all results on database
	 */
	public getAll() {
	}
}

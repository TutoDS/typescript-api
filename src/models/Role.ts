import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IRole extends Document {
	name: string;
	scopes: Array<string>;
}

const roleSchema = new Schema({
	name: {
		type: String,
		required: true,
		enum: ['ADMIN', 'TECHNIC'],
		unique: true,
	},
	scopes: [
		{
			type: String,
			enum: [
				'--view-all',
				'--create-all',
				'--edit-all',
				'--delete-all',
				'--view-users',
				'--create-users',
				'--edit-users',
				'--delete-users',
			],
			default: '--view-all',
		},
	],
});

export default model<IRole>('Role', roleSchema);

import mongoose, { Schema, Document, SchemaTypeOpts } from 'mongoose';
import Role, { IRole } from '@models/Role';

export interface IUser extends Document {
	name: string;
	email: string;
	role: IRole['_id'];
	password: string;
}

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			validate: {
				validator(data) {
					return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data);
				},
				message: (props) => `${props.value} is not a valid email!`,
			},
			required: [true, 'User email required'],
			unique: [true, 'This email already exists'],
		},
		role: {
			type: Schema.Types.ObjectId,
			ref: Role,
			required: [true, 'Role is required!'],
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
			unique: true,
		},
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

userSchema
	/**
	 * Validate if role id exists on database
	 */
	.path('role')
	.validate(
		(role: any) => Role.countDocuments({ _id: role }),
		((props: SchemaTypeOpts.ValidateOpts) =>
			`Role ${props} is not valid. Please change and try again.`).toString(),
	);

export default mongoose.model<IUser>('User', userSchema);

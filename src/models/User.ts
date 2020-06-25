import mongoose, { Schema, Types, Document } from 'mongoose';
import Role, { IRole } from './Role';

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
					return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data);
				},
				message: (props) => `${props.value} is not a valid email!`,
			},
			required: [true, 'User email required'],
			unique: [true, 'This email already exists'],
		},
		role: {
			type: Types.ObjectId,
			ref: Role,
			validate: {
				async validator(data) {
					const role = Role.countDocuments({ _id: data });

					return role;
				},
				message: (props) => `${props.value} is not a valid role!`,
			},
			required: [true, 'Role is required!'],
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
			unique: true,
		},
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model<IUser>('User', userSchema);

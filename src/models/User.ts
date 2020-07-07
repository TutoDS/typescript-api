// Mongoose Imports
import { Document, model, Schema, Query, SchemaTypeOpts } from 'mongoose';

// Bcrypt
import bcrypt from 'bcryptjs';
const SALT_FACTOR = 10;
const salt = bcrypt.genSaltSync(SALT_FACTOR);

// Role Model
import Role, { IRole } from '@models/Role';

export interface IUser extends Document {
	name: string;
	email: string;
	role: IRole['_id'];
	password: string;
	comparePassword(password): boolean;
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
		(role: IRole) => Role.countDocuments({ _id: role }),
		((props: SchemaTypeOpts.ValidateOpts) =>
			`Role ${props} is not valid. Please change and try again.`).toString(),
	);

// Custom Methods
userSchema.methods.comparePassword = function (pwd, callback) {
	return bcrypt.compare(pwd, this.password, callback);
};

/**
 * Actions to execute on pre and post
 */
userSchema
	// Populate on find/findOne/findOneAndUpdate
	.pre(/^(find|findOne|findOneAndUpdate)$/, function (this: IUser, next: () => Promise<any>) {
		this.populate([{ path: 'role', model: 'Role' }]);
		next();
	})

	// Update Password Hash
	.pre(/^(updateOne|update|findOneAndUpdate)$/, function (
		this: Query<IUser>,
		next: () => Promise<any>,
	) {
		if (this.getUpdate().password) {
			this.update({}, { password: bcrypt.hashSync(this.getUpdate().password, SALT_FACTOR) });
		}

		next();
	})

	// Action on Pre Save
	.pre('save', function (this: IUser, next: () => Promise<any>) {
		this.password = bcrypt.hashSync(this.password, salt);
		next();
	});

export default model<IUser>('User', userSchema);

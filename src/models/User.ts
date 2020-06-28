// Mongoose Imports
import * as mongoose from 'mongoose';

// Bcrypt
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

// Role Model
import Role, { IRole } from '@models/Role';

export interface IUser extends mongoose.Document {
	name: string;
	email: string;
	role: IRole['_id'];
	password: string;
}

const userSchema = new mongoose.Schema(
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
			type: mongoose.Schema.Types.ObjectId,
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
	{ versionKey: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

userSchema
	/**
	 * Validate if role id exists on database
	 */
	.path('role')
	.validate(
		(role: any) => Role.countDocuments({ _id: role }),
		((props: mongoose.SchemaTypeOpts.ValidateOpts) =>
			`Role ${props} is not valid. Please change and try again.`).toString(),
	);

// Custom Methods
userSchema.methods.getRole = function () {
	return this.role.name;
};

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

	// Update Passowrd Hash
	.pre(/^(updateOne|update|findOneAndUpdate)$/, async function (
		this: IUser,
		next: () => Promise<any>,
	) {
		if (this.getUpdate().password ) {
			this.getUpdate().password = await bcrypt.hash(this._update.password, 10);
		}

		next();
	})

	// Action on Pre Save
	.pre('save', async function (this: IUser, next: () => Promise<any>) {
		this.password = await bcrypt.hash(this.password, salt);
		next();
	});

export default mongoose.model<IUser>('User', userSchema);

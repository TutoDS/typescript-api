import { Context } from 'koa';
import User from '@models/User';
import jwt from 'jsonwebtoken';

// Get data by Config
import config from '@config';
const { secret } = config;

/**
 * User Controller
 *
 * Methods:
 * startSession (to login)
 * resetPassword (to request a reset password)
 * changePassword (to change password using token generated on resetPassword)
 * updatePassword (update password using older password to validate)
 */
export default class UserController {
	private ctx: Context;
	private expireTime: number = 60000 * 5;
	private user: typeof User;

	constructor() {
		this.user = User;
	}

	/**
	 * Generate JWT Token
	 * @param data fields/field to send on JWT Token
	 * @param time expires time (if null, is used the expireTime variable)
	 */
	private async generateToken(data: any, time?: number) {
		try {
			// Generate Token
			const jwtToken = await jwt.sign(data, secret, {
				expiresIn: `${time || this.expireTime}ms`,
			});

			return jwtToken;
		} catch (catchError) {
			this.ctx.throw(500, catchError);
		}
	}

	public async startSession(ctx: Context) {
		const { email, password } = ctx.request.body;
		const userFounded = await this.user.findOne({ email: email });

		try {
			// Compare Password (method on User Model)
			if (await userFounded.comparePassword(password)) {
				// Create a new object without properties like password (to send on token)
				const user = {
					email: userFounded.email,
					name: userFounded.name,
					role: userFounded.role.name,
					scopes: userFounded.role.scopes,
				};

				// Create Token
				const token = this.generateToken(user);

				ctx.cookies.set('session', await token, {
					expires: new Date(Date.now() + this.expireTime),
				});

				ctx.status = 200;
				ctx.body = {
					auth: true,
					token: await token,
					user: user,
					message: 'Login with success',
				};
			} else {
				ctx.status = 401;
				ctx.body = {
					auth: false,
					token: null,
					user: {},
					message: 'Invalid Credentials',
				};
			}
		} catch (catchError) {
			ctx.throw(500, catchError);
		}
	}

	public async create(ctx: Context) {
		const body = ctx.request.body;

		try {
			const newUser = await new User(body).save();

			if (await newUser) {
				const token = jwt.sign({ email: newUser.email }, secret, { expiresIn: 60 * 5 });

				// TODO: Send new user email

				ctx.status = 201;
				ctx.body = {
					status: 201,
					user: newUser,
				};
			} else {
				ctx.throw(400, `Error on create User`);
			}
		} catch (catchError) {
			ctx.throw(500, catchError);
		}
	}
}

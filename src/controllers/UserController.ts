import { Context } from 'koa';
import { Model, Document } from 'mongoose';

import User, { IUser } from '@models/User';

import jwt from 'jsonwebtoken';

/**
 * Get Config Data
 */
import config from '@config';
const { secret } = config;

/**
 *
 */
export default class UserController {
	private ctx: Context;
	private expireTime: number = 60000 * 5;
	private user: typeof User;

	constructor() {
		this.user = User;
	}

	private async generateToken(data: any, time?: number) {
		try {
			// Generate Token
			const jwtToken = await jwt.sign(data, secret, {
				expiresIn: `${time || this.expireTime}ms`,
			});

			return jwtToken;
		} catch (catchError) {
			this.ctx.throw(408, catchError);
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
}

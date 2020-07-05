import config from '@config';
import { Context } from 'koa';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (ctx: Context, next: () => Promise<any>) => {
	return next().catch((err) => {
		const { statusCode = 500, message } = err;

		// Set Response Type JSON
		ctx.type = 'json';

		if (config.isDev) {
			// Set Response Status
			ctx.status = statusCode;
			// Set Response Body
			ctx.body = {
				statusCode: statusCode,
				message,
			};

			ctx.app.emit('error', err, ctx);
		} else {
			ctx.status = statusCode;

			if (![500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511].includes(statusCode)) {
				ctx.body = {
					statusCode: statusCode,
					message,
				};
			}
		}
	});
};

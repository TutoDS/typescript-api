import * as Koa from 'koa';

export default async (ctx, next) => {
	return next().catch((err) => {
		const { statusCode, message } = err;

		// Set Response Type JSON
		ctx.type = 'json';
		// Set Response Status
		ctx.status = statusCode || 500;
		// Set Response Body
		ctx.body = {
			statusCode: statusCode || 500,
			message,
		};

		ctx.app.emit('error', err, ctx);
	});
};

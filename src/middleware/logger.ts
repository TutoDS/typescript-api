import * as Koa from 'koa';

export default async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
};

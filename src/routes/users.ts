import Router from 'koa-router';

const userRouter = new Router({ prefix: '/users' });

export default userRouter.get('/', (ctx, next) => {
	ctx.status = 200;
	ctx.body = { status: 'All Users!' };
});

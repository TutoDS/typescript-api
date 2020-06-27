import Router from 'koa-router';

const authRouter = new Router();

export default authRouter
	.post('/login', (ctx, next) => {
	})
	.post('/reset-password', (ctx, next) => {
	})
	.post('/change-password/:token', (ctx,next) => {});

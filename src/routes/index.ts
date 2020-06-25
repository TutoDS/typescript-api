import Router from 'koa-router';
import userRoutes from './users';

const router = new Router({ prefix: '/api' });

router
	// Base path
	.get('/', (ctx, next) => {
		ctx.status = 200;
		ctx.body = { status: 'API Working Fine!' };
	})

	// User Routes
	.use(userRoutes.routes());

export default router;

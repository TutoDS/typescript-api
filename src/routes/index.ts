import Router from 'koa-router';
import userRoutes from '@routes/users';
import authRoutes from '@routes/users/auth';

const router = new Router({ prefix: '/api' });

export default router
	// Base path
	.get('/', (ctx) => {
		ctx.status = 200;
		ctx.body = { status: 'API Working Fine!' };
	})

	// User Routes
	
	.use(userRoutes.routes())
	// Authentication Routes
	.use(authRoutes.routes());

import Router from 'koa-router';
import userRoutes from './users';

const router = new Router({ prefix: '/api' })

router
	.get('/', (ctx, next) => {
		ctx.status = 200
		ctx.body = { status: "Ok" }
	})
	.use(userRoutes.routes())


export default router
import Koa from 'koa';
import router from './src/routes';

const app = new Koa()

app
	.use(router.routes())
	.listen(3000, () => {
		console.log("RUN SERVER!")
	})
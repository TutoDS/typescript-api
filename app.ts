// DotEnv
import dotenv from 'dotenv';
dotenv.config();
const { PORT } = process.env;

// Koa
import Koa from 'koa';

// Routes
import router from './src/routes';

const app = new Koa();

app.use(router.routes()).listen(PORT, () => {
	console.log(`[SERVER RUN ON PORT ${PORT}]`);
});

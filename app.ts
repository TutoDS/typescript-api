// Monogoose Connection
import '@config/connection';

// DotEnv
import 'dotenv/config';
const { PORT = 3000 } = process.env;

// Koa
import Koa from 'koa';

// Middlewares
import logger from './src/middlewares/logger'

// Routes
import router from './src/routes';

const app = new Koa();

app
	// Logger
	.use(logger)

	// API Routes
	.use(router.routes())

	// Server port
	.listen(PORT, () => {
		console.log(`[SERVER RUN ON PORT ${PORT}]`);
	});

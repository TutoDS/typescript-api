// Monogoose Connection
import { mongoose } from '@config/mongoose';

// DotEnv
import * as dotenv from 'dotenv';
dotenv.config();
const { PORT = 3000 } = process.env;

// Koa
import Koa from 'koa';

// Middlewares
import logger from './src/middlewares/logger'

// Routes
import router from './src/routes';

const app = new Koa();

app
	.use(mongoose)
	// Logger
	.use(logger)

	// API Routes
	.use(router.routes())
	.listen(PORT, () => {
		console.log(`[SERVER RUN ON PORT ${PORT}]`);
	});

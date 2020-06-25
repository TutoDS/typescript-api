// Monogoose Connection
import '@config/connection';

// DotEnv
import 'dotenv/config';

// Koa
import Koa from 'koa';

// Routes
import apiRoutes from '@allRoutes';

// Middlewares
import logger from '@middlewares/logger';

const { PORT = 3000 } = process.env;

const app = new Koa();

app
	// Logger
	.use(logger)

	// API Routes
	.use(apiRoutes.routes())

	// Server port
	.listen(PORT, () => {
		console.log(`[SERVER RUN ON PORT ${PORT}]`);
	});

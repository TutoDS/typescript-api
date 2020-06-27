// Monogoose Connection
import '@config/connection';

// Config
import config from '@config';

// Koa
import Koa from 'koa';
// --> Body Parser
import bodyParser from 'koa-bodyparser';
// --> Cors
import cors from 'koa2-cors';

// Routes
import apiRoutes from '@routes';

// Middleware
import logger from '@root/src/middleware/logger';

const app = new Koa();

app
	// Logger
	.use(logger)

	// Body Parser
	.use(bodyParser())

	// Cors
	.use(cors())

	// API Routes
	.use(apiRoutes.routes())

	// Server port
	.listen(config.port, () => {
		console.log(`[SERVER RUN ON ${config.port}]`);
	});

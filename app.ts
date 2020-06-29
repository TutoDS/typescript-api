// Mongoose Connection
import '@config/connection';

// Config
import config from '@config';

// Koa
import Koa from 'koa';
// --> Body Parser
import bodyParser from 'koa-bodyparser';
// --> Cors
import cors from 'koa2-cors';
// --> Koa Static
import serve from 'koa-static';

// Routes
import apiRoutes from '@routes';

// Middleware
import logger from '@root/src/middleware/logger';

// Documentation
import swagger from 'swagger-injector';
import docs from '@docs';

const app = new Koa();

app
	// Static Files
	.use(serve(`${__dirname}/public`))
	.use(serve(`${__dirname}/uploads`))

	// Logger
	.use(logger)

	// Body Parser
	.use(bodyParser())

	// Cors
	.use(cors())

	// API Routes
	.use(apiRoutes.routes())

	.use(
		swagger.koa({
			route: '/docs',
			swagger: docs,
		}),
	)

	// Server port
	.listen(config.port, () => {
		console.log(`[SERVER RUN ON ${config.port}]`);
	});

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

// Middleware
//	--> Error Handler
import errorHandler from '@middleware/errorHandler';
//	--> Logger
import logger from '@middleware/logger';

// Routes
import apiRoutes from '@routes';

const app = new Koa();

app
	// Static Files
	.use(serve(`${__dirname}/public`))
	.use(serve(`${__dirname}/uploads`))

	// Logger
	.use(logger)

	// Error Handler
	.use(errorHandler)

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

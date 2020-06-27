// DotEnv
import config from '@config';

// Mongoose
import mongoose from 'mongoose';

export default mongoose.connect(
	`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	(error) => {
		console.log(error ? `[ERROR: ${error}]` : '[MONGOOSE CONNECTED WITH SUCCESS]');
	},
);

// DotEnv
import * as dotenv from 'dotenv';
dotenv.config();
const { MONGO_PORT = 27017, MONGO_HOST = 'localhost', MONGO_DB = 'covidApi' } = process.env;

// Mongoose
import mongoose from 'mongoose';

const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

export default mongoose.connect(
	url,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	(error) => {
		console.log(error ? `[ERROR: ${error}]` : '[MONGOOSE CONECTED WITH SUCCESS]');
	}
);

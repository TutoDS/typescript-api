// DotEnv
import 'dotenv/config';

const {
	PORT,
	MONGO_HOST,
	MONGO_DB,
	MONGO_PORT,
	ADMIN_USER,
	ADMIN_PWD,
	ADMIN_EMAIL,
	SECRET,
} = process.env;

export interface IConfig {
	port: number;
	dbHost: string;
	dbPort: number;
	dbName: string;
	adminName: string;
	adminEmail: string;
	adminPwd: string;
	secret: string;
}

const config: IConfig = {
	// Server Port
	port: +(PORT || 3000),

	// Mongoose Data (with default values in case not have .env file)
	dbHost: MONGO_HOST || 'localhost',
	dbPort: +(MONGO_PORT || 27017),
	dbName: MONGO_DB || 'covidAPI',

	// Admin Data (withou defaults)
	adminName: ADMIN_USER,
	adminEmail: ADMIN_EMAIL,
	adminPwd: ADMIN_PWD,

	// Secret string to JWT
	secret: SECRET || 'my-jwt-secret-2020#api',
};
export default config;

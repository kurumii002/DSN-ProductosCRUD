import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT as unknown as number;

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	port: dbPort,
	dialect: "mysql"
});
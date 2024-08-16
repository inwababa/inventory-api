import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.DB_HOST!;
const dbType: String = process.env.DB_TYPE!;
const dbName = process.env.DB_NAME!;
const dbUsername = process.env.DB_USERNAME!;
const dbPassword = process.env.DB_PASSWORD!

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: host,
  dialect: 'mysql',
});

export default sequelize;

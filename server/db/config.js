import { Sequelize } from "sequelize";

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

export default db;

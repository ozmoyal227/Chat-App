import { Sequelize } from "sequelize";
import initRoom from "./models/room.js";
import initUser from "./models/user.js";

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const dbConnString = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const isProdEnv = process.env.NODE_ENV === "production";

const devConfig = {
  logging: false,
};

const prodConfig = {
  logging: false,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const sequelize = new Sequelize(
  dbConnString,
  !isProdEnv ? devConfig : prodConfig
);

const db = {
  sequelize: sequelize,
  users: null,
  rooms: null,
};

try {
  db.users = initUser(sequelize);
  db.rooms = initRoom(sequelize);
} catch (error) {
  console.error("Error init table", error);
}

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB - Connection has been established successfully.");
  } catch (error) {
    console.error("DB - Unable to connect to the database:", error);
  }
})();

export default db;

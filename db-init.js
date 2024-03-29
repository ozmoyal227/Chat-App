//================================================================
//This page handles the Data-Base initialization and connection
//import all other modules required for DB construction
//================================================================

//import modules and sequelize, our ORM(object-relational mapping) for postgres
import { Sequelize } from "sequelize";
import initRoom from "./models/room.js";
import initUser from "./models/user.js";

//import environment values to initialize connection with the DB 
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const dbConnString = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

//instances for sequelize configuration, depend on environment
const isProdEnv = (process.env.NODE_ENV === "production");

//creating configurations for sequelize for each environment 
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

//sequelize initialization 
const sequelize = new Sequelize(
  dbConnString,
  !isProdEnv ? devConfig : prodConfig
);

//DB initialization 
const db = {
  sequelize: sequelize,
  users: null,
  rooms: null,
};

//initialize modules on DB
try {
  db.users = initUser(sequelize);
  db.rooms = initRoom(sequelize);
} catch (error) {
  console.error("Error init table", error);
}

//testing DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB - Connection has been established successfully.");
  } catch (error) {
    console.error("DB - Unable to connect to the database:", error);
  }
})();

export default db;

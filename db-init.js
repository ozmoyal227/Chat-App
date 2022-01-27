import { Sequelize } from "sequelize";
import initRoom from "./models/room.js";
import initUser from "./models/user.js";
// import roomsService from "./services/rooms.service.js";


const sequelize = (JSON.stringify(process.env.DB_HOST) === JSON.stringify("localhost")) ?
 new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      logging: false,
    }
  ) :
 new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        logging: false,
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
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

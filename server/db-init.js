import { Sequelize } from "sequelize";
import initRoom from "./models/room.js";
import initUser from "./models/user.js";

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB - Connection has been established successfully.");
  } catch (error) {
    console.error("DB - Unable to connect to the database:", error);
  }
})();

const db = {
  sequelize: sequelize,
  users: initUser(sequelize),
  rooms: initRoom(sequelize),
};

// TODO: [OZ] create many to many relation between Users - Rooms

db.users.hasMany(db.rooms, { as: "rooms" });
db.rooms.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

export default db;

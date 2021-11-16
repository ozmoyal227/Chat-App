import sequelize from "sequelize";
import db from "../config.js";

const { DataTypes } = sequelize;

const User = db.define("User", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default User;

// ================================================================
// This page holds the User module for the DB
// ================================================================ 

//import sequelize
import sequelize from "sequelize";
const { DataTypes } = sequelize;

//function to initialize User module with all the attributes for users
const initUser = (sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rooms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    files: {
      type: DataTypes.JSON,
      defaultValue: "",
    },
  });

  return User;
};

export default initUser;

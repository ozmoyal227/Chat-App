// ================================================================
// This page holds the Room module for the DB
// ================================================================ 

//import sequelize
import sequelize from "sequelize";
const { DataTypes } = sequelize;

//function to initialize Room module with all the attributes for chat rooms
const initRoom = (sequelize) => {
  const Room = sequelize.define("room", {
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
    users: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    messages: {
      type: DataTypes.JSON,
      defaultValue: "",
    },
  });

  return Room;
};

export default initRoom;

import sequelize from "sequelize";
const { DataTypes } = sequelize;

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
  });

  return Room;
};

export default initRoom;

import sequelize from "sequelize";
const { DataTypes } = sequelize;

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

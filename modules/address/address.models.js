const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const address = sequelize.define("address", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    communication_address: {
      type: DataTypes.JSON,
    },
    permanent_address: {
      type: DataTypes.JSON,
    },
  });
  return address;
};

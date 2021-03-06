const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const parentdetails = sequelize.define("parentdetails", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    mother_details: {
      type: DataTypes.JSON,
    },
    father_details: {
      type: DataTypes.JSON,
    },
  });
  return parentdetails;
};

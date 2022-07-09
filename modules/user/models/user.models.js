const { DataTypes } = require("sequelize");
const db = require("../../../lib/connection");

module.exports = (sequelize) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("approve", "reject", "shortlist", "waiting"),
        defaultValue: 'waiting'
      },
      mobile: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admission_no: {
        type: DataTypes.STRING,
      },
      relevant_type: {
        type: DataTypes.ENUM("General", "Father", "Mother", "Siblings"),
        allowNull: false,
      },
      alumini_details: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: true,
    }
  );

  return user;
};

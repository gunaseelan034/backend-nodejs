const { DataTypes } = require("sequelize");
const db = require("../../../lib/connection");
const uuid = require("uuid");

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
      admission_no: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      adhar_card: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("approve", "reject", "shortlist", "waiting"),
        defaultValue: "waiting",
      },
      mobile: {
        type: DataTypes.INTEGER,
      },
      admission_no: {
        type: DataTypes.TEXT,
      },
      relevant_type: {
        type: DataTypes.ENUM("General", "Father", "Mother", "Siblings"),
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

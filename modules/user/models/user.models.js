const { DataTypes } = require("sequelize");
const db = require("../../../lib/connection");
const uuid = require("uuid");

module.exports = (sequelize) => {
  const user = sequelize.define("user", {
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
    applicant_photo: {
      type: DataTypes.STRING,
    },
    age_proof: {
      type: DataTypes.STRING,
    },
    adhar_photo: {
      type: DataTypes.STRING,
    },
    father_photo: {
      type: DataTypes.STRING,
    },
    mother_photo: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(
        "approve",
        "reject",
        "shortlist",
        "waiting",
        "Interview"
      ),
      defaultValue: "waiting",
    },
    interview_date: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    mobile: {
      type: DataTypes.STRING,
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
  });

  return user;
};

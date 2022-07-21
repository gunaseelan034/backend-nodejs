const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const student = sequelize.define("student", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "others"),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    class: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING,
    },
    blood_group: {
      type: DataTypes.STRING,
    },
    aadhar_no: {
      type: DataTypes.INTEGER,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    mother_tongue: {
      type: DataTypes.STRING,
    },
    extra_curricular: {
      type: DataTypes.STRING,
    },
    religion: {
      type: DataTypes.STRING,
    },
    community: {
      type: DataTypes.STRING,
    },
    distance: {
      type: DataTypes.STRING,
    },
    prof_in_sports: {
      type: DataTypes.STRING,
    },
    board: {
      type: DataTypes.STRING,
    },
  });

  return student;
};

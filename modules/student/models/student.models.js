module.exports = (sequelize, datatype) => {
  const student = sequelize.define("student", {
    first_name: {
      type: datatype.STRING,
      allowNull: false,
    },
    last_name: {
      type: datatype.INTEGER,
      allowNull: false,
    },
    gender: {
      type: datatype.ENUM("male", "female", "others"),
      allowNull: false,
    },
    std: {
      type: datatype.STRING,
    },
    dob: {
      type: datatype.INTEGER,
    },
    blood_group: {
      type: datatype.STRING,
    },
    adhar: {
      type: datatype.INTEGER,
    },
    height: {
      type: datatype.STRING,
    },
    height: {
      type: datatype.STRING,
    },
    nationality: {
      type: datatype.STRING,
    },
    community: {
      type: datatype.STRING,
    },
    prof_in_sports: {
      type: datatype.STRING,
    },
    board: {
      type: datatype.STRING,
    },
  });
  return student;
};

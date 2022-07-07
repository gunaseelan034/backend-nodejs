module.exports = (sequelize, datatype) => {
  const student = sequelize.define("student", {
    first_name: {
      type: datatype.STRING,
    },
    last_name: {
      type: datatype.INTEGER,
    },
    gender: {
      type: datatype.ENUM("male", "female", "others"),
    },
    uuid: {
      type: datatype.STRING,
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
    weight: {
      type: datatype.STRING,
    },
    nationality: {
      type: datatype.STRING,
    },
    mother_tounges: {
      type: datatype.STRING,
    },
    extra_curriculer: {
      type: datatype.STRING,
    },
    community: {
      type: datatype.STRING,
    },
    distance: {
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

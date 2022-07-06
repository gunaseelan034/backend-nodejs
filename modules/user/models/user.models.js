module.exports = (sequelize, datatype) => {
  const user = sequelize.define("user", {
    email: {
      type: datatype.STRING,
      allowNull: false,
    },
    mobile: {
      type: datatype.INTEGER,
      allowNull: false,
    },
    relevent_type: {
      type: datatype.ENUM("Generel", "Father", "Mother", "Siblings"),
      allowNull: false,
    },
    father: {
      type: datatype.JSON,
    },
    mother: {
      type: datatype.JSON,
    },
    siblings: {
      type: datatype.JSON,
    },
  });
  return user;
};

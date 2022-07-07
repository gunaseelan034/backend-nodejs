const db = require("../../../lib/connection");


module.exports = (sequelize, datatype) => {
  const user = sequelize.define("user", {
    email: {
      type: datatype.STRING,
      unique: true,
      allowNull: false,
    },
    mobile: {
      type: datatype.INTEGER,
      unique: true,
      allowNull: false,
    },
    uuid: {
      type: datatype.STRING,
    },
    relevant_type: {
      type: datatype.ENUM("General", "Father", "Mother", "Siblings"),
      allowNull: false,
    },
    alumini_details: {
      type: datatype.JSON,
    },
  });
  return user;
};

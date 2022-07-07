module.exports = (sequelize, datatype) => {
    const parentdetails = sequelize.define("parentdetails", {
      parent_details: {
        type: datatype.JSON,
      },
      uuid: {
        type: datatype.STRING,
      },
    });
    return parentdetails;
  };
  
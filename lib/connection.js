const DB_CONFIG = require("../config/mysqldb");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  DB_CONFIG.database,
  DB_CONFIG.user,
  DB_CONFIG.password,
  {
    host: DB_CONFIG.host,
    dialect: DB_CONFIG.dialect,
    operatorsAlias: false,
    pool: {
      max: DB_CONFIG.pool.max,
      min: DB_CONFIG.pool.min,
      acquire: DB_CONFIG.pool.acquire,
      idle: DB_CONFIG.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err + "found");
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* 
  <---------------- inserting model into sequilie -------------->
*/
db.user = require("../modules/user/models/user.models")(sequelize, DataTypes);
db.student = require("../modules/student/models/student.models")(
  sequelize,
  DataTypes
);
db.parentdetails = require("../modules/parentdetails/models/parent.models")(
  sequelize,
  DataTypes
);
db.address = require("../modules/address/address.models")(sequelize, DataTypes);
/* 
  <---------------- inserting model into sequilie -------------->
*/

db.user.hasMany(db.student, {
  foreignKey: {
    name: "parent_id",
    type: DataTypes.INTEGER,
  },
});
db.user.hasMany(db.parentdetails, {
  foreignKey: {
    name: "parent_id",
    type: DataTypes.INTEGER,
  },
});
db.user.hasMany(db.address, {
  foreignKey: {
    name: "parent_id",
    type: DataTypes.INTEGER,
  },
});

// belongs to (one to one)
db.student.belongsTo(db.user);
db.parentdetails.belongsTo(db.user);
db.address.belongsTo(db.user);

db.sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("re-sync done");
});

module.exports = db;

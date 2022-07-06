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
/* 
  <---------------- inserting model into sequilie -------------->
*/

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

module.exports = db;

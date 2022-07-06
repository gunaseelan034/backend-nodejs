const DB_CONFIG = {
    host: 'localhost',
    database: 'schoolapp',
    user: 'root',
    password: '',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = DB_CONFIG;

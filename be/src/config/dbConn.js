const Sequelize = require("sequelize");

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_DIAL } = process.env;
const dbConn = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIAL,
});

module.exports = dbConn;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_SERVER,
    port: process.env.SQL_PORT,
    dialect: "mssql",
    dialectOptions: {
      // Additional options, which are optional
      options: {
        encrypt: false,
        trustedConnection: true
      }
    },       
  }
);

module.exports = sequelize;

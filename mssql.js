const sql = require("mssql");
const sqlConfig = {
  user: process.env.DB_USER,  
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedConnection: true

  }
};

async () => {
  try {
    await sql.connect(sqlConfig);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sqlConfig };

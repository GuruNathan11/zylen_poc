const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sls = require("serverless-http");
require('dotenv').config();
const app = express();
const sequelize = require("./sequelize/sequelize.js")

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const router = require("./router/routes.js")
app.use("/api", router);

app.get("/",(req,res)=> res.send("Simple POC..."));
const port = 8000;

sequelize
  .sync()
  .then(() => console.log("MSSQL DB Connection Succeesfully..."))
  .catch((err) => console.log("error in database establishment:",err));


app.listen(port, ()=> console.log(`Server running on Port ${port}`))

module.exports.handler = sls(app);
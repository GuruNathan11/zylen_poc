const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize");

const StudentModel = sequelize.define(
    "student",
    {        
        student_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_age : {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_class: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

module.exports = StudentModel;
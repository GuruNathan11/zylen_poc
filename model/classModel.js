const { DataTypes } = require('sequelize');
const Sequelize = require('../sequelize/sequelize');

const ClassModel = Sequelize.define(
    "class",
    {
        class_id:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        class_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        class_location:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps : true
    }
);

module.exports = ClassModel;
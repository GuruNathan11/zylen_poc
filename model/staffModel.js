const { DataTypes } = require("sequelize")
const Sequelize = require("../sequelize/sequelize");

const StaffModel = Sequelize.define(
    "staff",
    {
        staff_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        staff_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        staff_class: {
            type: DataTypes.STRING,
            allowNull: false
        },
        staff_mobile: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timeStamp: true
    }
)

module.exports = StaffModel;
const StaffModel = require('../model/staffModel');
const {mssqlConfig} = require('../mssql')
const sql = require("mssql");


module.exports.staffRegister = async function (req,res) {
    const {
        staff_id,
        staff_name,
        staff_class,
        staff_mobile
    } = req.body

    try{
        const existingStaff = await StaffModel.findOne({
            where: {
                staff_id: staff_id
            },
        });

        if(existingStaff) {
           return res.status(400).json({error: [{msg: "Staff Already Registered"}]});
        }
        const newStaff = await StaffModel.create({
            staff_id : staff_id,
            staff_name : staff_name,
            staff_class : staff_class,
            staff_mobile : staff_mobile
        })
        const newStaffData = newStaff?.dataValues;
        res.status(201).json({
            data : newStaffData,
            message : "Staff Registration Successfully"
        })
    } catch (err) {
        console.error("error", err);
        res.status(500).send({
            err : err,
            message : "Staff Registration Failed..."
    })
    }
};

module.exports.getAllStaff = async function (req,res) {
    try {
       const staffs = await StaffModel.findAll();
       if(staffs.length > 0){
        res.status(200).json({
            data : staffs,
            message : "All staff list fetched Successfully"
        })
       } else {
        res.status(404).json({
            message : "No stduents Found..."
        })
       }
    } catch (err) {
        console.log("Error: ",err);
        res.status(500).json({
            err : err,
            message : "staff Details Fetched Failed While getting all"
        })
    }
};

module.exports.getStaffById = async function (req,res) {
    const { staff_id } = req.params;
    try{
        const response = await StaffModel.findOne({ where: { staff_id: staff_id }});
        res.status(200).send({
            data : response,
            message : "Staff Details Fetched Successfully..."
        })
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            err : err,
            message : "Staff details fetched failed"
        })
    }
};

module.exports.updateStaff = async function (req,res) {
    const { staff_id } = req.params;
    const {
        staff_name,
        staff_class,
        staff_mobile
    } = req.body
    const updateStaffData = {
        staff_name,
        staff_class,
        staff_mobile
    }; 

    try{        
        const staff = await StaffModel.findOne({ where : { staff_id : staff_id}})

        if(!staff){
            return res.status(404).json({ message : "Staff Not found"})
        }
        const [updatedRows] = await StaffModel.update(updateStaffData, {
            where : {
                staff_id : staff_id
            }
        });
        if (updatedRows > 0) {
            res.status(200).json({
                data : updatedRows,
                message: "Staff data updated successfully."
            });
        } else {
            res.status(404).json({ message: "Failed to update staff data." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            err: err,
            message: "Failed during update the staff data."
        });
    }
};
module.exports.deleteStaff = async function (req, res) {
    const { staff_id } = req.params;
    try{
        const staff = await StaffModel.findOne({
            where: {
                staff_id : staff_id
            }
        });
        if(!staff) {
            return res.status(404).json({
                error : [{ msg: 'Staff not Found'}]
            })
        }
        await StaffModel.destroy({
            where : {
                staff_id : staff_id,
            }
        });
        res.status(200).json({
            data: [{ deleteStaff : req.params.staff_id}],
            message : "Staff data deleted Successfully..."
        });
    } catch (err){
        console.error("Error: ", err);
        res.status(500).send({
            err : err,
            message : "Failed to delete the Staff data..."
        })
    }
}
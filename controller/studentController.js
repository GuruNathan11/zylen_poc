const StudentModel = require('../model/studentModel');
const {mssqlConfig} = require('../mssql')
const sql = require("mssql");

module.exports.studentRegister = async function (req,res) {
    const {
        student_id,
        student_name,
        student_age,
        student_class
    } = req.body

    try{
        const existingStudent = await StudentModel.findOne({
            where: {
                student_id: student_id
            },
        });

        if(existingStudent) {
           return res.status(400).json({error: [{msg: "Student Already Registered"}]});
        }
        const newStudent = await StudentModel.create({
            student_id : student_id,
            student_name : student_name,
            student_age : student_age,
            student_class : student_class
        })
        const newStudentData = newStudent?.dataValues;
        res.status(201).json({
            data : newStudentData,
            message : "Student Registration Successfully"
        })
    } catch (err) {
        console.error("error", err);
        res.status(500).json({
            err : err,
            message : "Student Registration Failed..."
    })
    }
};

module.exports.getAllStudent = async function (req,res) {
    try {
       const students = await StudentModel.findAll();
       if(students.length > 0){
        res.status(200).json({
            data : students,
            message : "All student list fetched Successfully"
        })
       } else {
        res.status(404).json({
            message : "No stduents Found..."
        })
       }
    } catch (err) {
        console.log("Error: ",err);
        res.status(500).send({
            err : err,
            message : "Student Details Fetched Failed While getting all"
        })
    }
};

module.exports.getStudentById = async function (req,res) {
    const { student_id } = req.params;
    try{
        const response = await StudentModel.findOne({ where: { student_id: student_id }});
        if (response) {
            res.status(200).send({
                data : response,
                message : "Student Details Fetched Successfully..."
            });
        } else {
            res.status(404).send({ message: "Student not found" });
        }
    } catch (err) {
        console.log("error: ", err);
        res.status(500).send({
            err : err,
            message : "Student details fetched failed"
        });
    }
};


module.exports.updateStudent = async function (req,res) {
    const { student_id } = req.params;
    const {
        student_name,
        student_age,
        student_class
    } = req.body
    const updateStudenetData = {
        student_name,
        student_age,
        student_class
    };    

    try{

        const student = await StudentModel.findOne({ where : { student_id : student_id}})
        if(!student){
            return res.status(404).json({ message : "Student Id Not found..."})
        }
        const [updatedRows] = await StudentModel.update(updateStudenetData, {
            where : {
                student_id : student_id
            }
        });
        if (updatedRows > 0) {
            res.status(200).json({
                data : updatedRows,
                message: "Student data updated successfully."
            });
        } else {
            res.status(404).json({ message: "Failed to update student data." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            err : err,
            message : "Failed during update the student data..."
        })
    }
};

module.exports.deleteStudent = async function (req, res) {
    const { student_id } = req.params;
    try{
        const student = await StudentModel.findOne({
            where: {
                student_id : student_id
            }
        });
        if(!student) {
            return res.status(404).json({
                error : [{ msg: 'Student not Found'}]
            })
        }
        await StudentModel.destroy({
            where : {
                student_id : student_id,
            }
        });
        res.status(200).json({
            data: [{ deleteStudent : req.params.student_id}],
            message : "Student data deleted Successfully..."
        });
    } catch (err){
        console.error("Error: ", err);
        res.status(500).send({
            err : err,
            message : "Failed to delete the student data..."
        })
    }
}
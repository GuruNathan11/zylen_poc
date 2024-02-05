const ClassModel = require('../model/classModel');
const {mssqlConfig} = require('../mssql')


module.exports.classRegister = async function (req,res) {
    const {
        class_id,
        class_name,
        class_location,        
    } = req.body

    try{
        const existingClass = await ClassModel.findOne({
            where: {
                class_id: class_id
            },
        });

        if(existingClass) {
           return res.status(400).json({error: [{msg: "Class Already Registered"}]});
        }
        const newClass = await ClassModel.create({
            class_id : class_id,
            class_name : class_name,
            class_location : class_location
        })
        const newClassData = newClass?.dataValues;
        res.status(201).json({
            data : newClassData,
            message : "Class Registration Successfully"
        })
    } catch (err) {
        console.error("error", err);
        res.status(500).json({
            err : err,
            message : "Class Registration Failed..."
    })
    }
};

module.exports.getAllClass = async function (req,res) {
    try {
       const classes = await ClassModel.findAll();
       if(classes.length > 0){
        res.status(200).json({
            data : classes,
            message : "All class list fetched Successfully"
        })
       } else {
        res.status(404).json({
            message : "No Class Found..."
        })
       }
    } catch (err) {
        console.log("Error: ",err);
        res.status(500).send({
            err : err,
            message : "class Details Fetched Failed While getting all"
        })
    }
};

module.exports.getClassById = async function (req,res) {
    const { class_id } = req.params;
    try{
        const response = await ClassModel.findById(class_id);
        res.status(200).send({
            data : response,
            message : "Class Details Fetched Successfully..."
        })
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            err : err,
            message : "Class details fetched failed"
        })
    }
};

module.exports.updateClass = async function (req,res) {
    const { class_id } = req.params;
    const {
       class_name,
       class_location
    } = req.body
    const updateClassData = {
        class_name,
       class_location
    };   

    try{
        const classes = await ClassModel.findOne({ where : { class_id : class_id}})
        if(!classes) {
            return res.status(404).json({ message : "Class Id not to be found..."})
        }
        const [updatedRows] = await ClassModel.update(updateClassData, {
            where : {
                class_id : class_id
            }
        });
        if(updatedRows > 0){
        res.status(400).json({
            data : updatedRows,
            message : "Class data Updated successfully..."
        })
    } else {
        res.status(404).json({ message : "Failed to update class data..."})
    }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            err : err,
            message : "Failed during update the class data..."
        })
    }
};

module.exports.deleteClass = async function (req, res) {
    const { class_id } = req.params;
    try{
        const classes = await ClassModel.findOne({
            where: {
                class_id : class_id
            }
        });
        if(!classes) {
            return res.status(404).json({
                error : [{ msg: 'Class not Found'}]
            })
        }
        await ClassModel.destroy({
            where : {
                class_id : class_id,
            }
        });
        res.status(200).json({
            data: [{ deleteClass : req.params.class_id}],
            message : "Class data deleted Successfully..."
        });
    } catch (err){
        console.error("Error: ", err);
        res.status(500).send({
            err : err,
            message : "Failed to delete the Class data..."
        })
    }
}
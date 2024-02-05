const express = require("express");
const router = express.Router();
const studentController = require("../../controller/studentController")


router.post("/register", studentController.studentRegister);

router.get("/getAll", studentController.getAllStudent);

router.get("/get/:student_id", studentController.getStudentById);

router.put("/update/:student_id", studentController.updateStudent);

router.delete("/delete/:student_id", studentController.deleteStudent);


 module.exports = router;
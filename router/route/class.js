const express = require("express");
const router = express.Router();
const classController = require("../../controller/classController")


router.post("/register", classController.classRegister);

router.get("/getAll", classController.getAllClass);

router.get("/get/:class_id", classController.getClassById);

router.put("/update/:class_id", classController.updateClass);

router.delete("/delete/:class_id", classController.deleteClass);


 module.exports = router;
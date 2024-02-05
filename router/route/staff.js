const express = require("express");
const router = express.Router();
const staffController = require("../../controller/staffController")


router.post("/register", staffController.staffRegister);

router.get("/getAll", staffController.getAllStaff);

router.get("/get/:staff_id", staffController.getStaffById);

router.put("/update/:staff_id", staffController.updateStaff);

router.delete("/delete/:staff_id", staffController.deleteStaff);


 module.exports = router;
const express = require('express');
const router = express.Router();

let studentRoutes = require('./route/student');
let staffRoutes = require('./route/staff');
let classRoutes = require('./route/class') 

router.use("/student", studentRoutes);
router.use("/staff", staffRoutes);
router.use("/class", classRoutes);


module.exports = router;
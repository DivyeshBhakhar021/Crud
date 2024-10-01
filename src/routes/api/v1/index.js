const express = require("express");
const router = express.Router();

const student = require("./student.route");
const getdata = require("./getData.route");


router.use("/student",student)
router.use("/data", getdata);

module.exports = router
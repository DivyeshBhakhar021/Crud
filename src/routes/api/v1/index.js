const express = require("express");
const router = express.Router();

const student = require("./student.route");
const getdata = require("./getData.route");
const user = require("./user.route")


router.use("/student",student)
router.use("/data", getdata);
router.use("/user", user)

module.exports = router
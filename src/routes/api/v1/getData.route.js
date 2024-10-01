const express = require("express");
const { getdataController } = require("../../../controller");
const router = express.Router();

router.get("/getcountries", getdataController.getcountriesdata);

router.get("/getstate", getdataController.getstatedata);

router.get("/getcities", getdataController.getcitiessdata);

module.exports = router;


// http://localhost:5000/api/v1/data/getcountries
// http://localhost:5000/api/v1/data/getstate
// http://localhost:5000/api/v1/data/getcities

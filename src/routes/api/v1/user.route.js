const express = require("express");
const { userController } = require("../../../controller");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout",userController.logout)
router.post("/chekhlogin", userController.chekhlogin);

module.exports = router;

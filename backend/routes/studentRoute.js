const express = require("express");
const studentController = require("../controller/studentController");
let router = express.Router();
router.post("/register",studentController.createAccount);
router.post("/login",studentController.loginAccount);
router.post("/create",studentController.addDetails);
module.exports = router;

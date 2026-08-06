const express = require("express");
const studentController = require("../controller/studentController");
let router = express.Router();
router.post("/create",studentController.createAccount);
router.post("/login",studentController.loginAccount);
module.exports = router;

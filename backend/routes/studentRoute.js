const express = require("express");
const studentController = require("../controller/studentController");
let router = express.Router();
router.post("/register",studentController.createAccount);
router.post("/login",studentController.loginAccount);
router.post("/create",studentController.addDetails);
router.get("/getDetails", studentController.getAllDetails);
router.delete("/delete/:id", studentController.deleteDetails);
module.exports = router;

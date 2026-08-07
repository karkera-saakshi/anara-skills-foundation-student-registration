const express = require("express");
const studentController = require("../controller/studentController");
let router = express.Router();
router.post("/register",studentController.createAccount);
router.post("/login",studentController.loginAccount);
router.post("/create",studentController.addDetails);
router.get("/getDetails", studentController.getAllDetails);
router.delete("/delete/:id", studentController.deleteDetails);
router.put("/update/:id", studentController.updateDetails);
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("Logged out successfully");
  });
module.exports = router;

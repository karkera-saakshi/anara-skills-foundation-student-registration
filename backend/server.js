require("dotenv").config();
const express = require("express");
const cors = require("cors");
const studentRoute = require("./routes/studentRoute")
let app = express();
app.use(cors());
app.use(express.json());
app.use("/", studentRoute);
app.listen(9000, () => console.log("I am listening"));
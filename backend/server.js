try {
  require("dotenv").config();
} catch (e) {
  // dotenv not available in production — Vercel injects env vars directly, so this is fine
}

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const studentRoute = require("./routes/studentRoute");

let app = express();
app.use(cors({
    origin: [
        'https://anara-skills-foundation-student-reg-sigma.vercel.app',
        'http://localhost:5173'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", studentRoute);

if (require.main === module) {
  app.listen(9000, () => console.log("I am listening"));
}

module.exports = app;
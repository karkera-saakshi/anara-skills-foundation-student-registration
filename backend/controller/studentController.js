const studentModel = require("../model/studentModel");

let createAccount = (req,res) =>{
    studentModel.createAccount(req.body, res);
}

let loginAccount = (req, res) =>{
    studentModel.loginAccount(req.body, res);
}


module.exports = { createAccount, loginAccount };

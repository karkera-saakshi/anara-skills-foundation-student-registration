const studentModel = require("../model/studentModel");

let createAccount = (req,res) =>{
    studentModel.createAccount(req.body, res);
}

let loginAccount = (req, res) =>{
    studentModel.loginAccount(req.body, res);
}

let addDetails = (req, res) =>{
    studentModel.addDetails(req.body, res);
}

let getAllDetails = (req, res) =>{
    studentModel.getAllDetails(res);
}

let deleteDetails = (req, res) =>{
    studentModel.deleteDetails(req.params.id, res);
}

let updateDetails = (req, res) =>{
    studentModel.updateDetails(req.params.id, req.body, res);
}

module.exports = { createAccount, loginAccount, addDetails, getAllDetails, deleteDetails, updateDetails };

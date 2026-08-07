const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let SECRET = process.env.JWT_SECRET;
let url = process.env.MONGO_URL;
let getCollection = () => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("student-db");
    let coll = db.collection("studentDB");
    return { client, coll};
};

let createAccount = (obj,res) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("student-db");
    let coll = db.collection("users");
    obj.password = bcrypt.hashSync(obj.password, 10);
    coll.insertOne(obj)
    .then((result)=> res.send(result))
    .catch((err)=>res.status(500).send(err))
    .finally (()=>client.close())

}

let loginAccount = async (obj, res) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("student-db");
    let coll = db.collection("users");
    coll.findOne({ email: obj.email })
        .then((user) => {
            if (!user) {
                return res.status(400).send("User not found");
            }
            let ok = bcrypt.compareSync(obj.password, user.password);
            if (!ok) {
                return res.status(400).send("Password incorrect");
            }
            let token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
            res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 }); 
            
            res.send("Login Successful");
        })
        .catch((err) => {
            res.status(500).send(err);
        })
        .finally(() => {
            client.close();
        });
};


let addDetails = (obj,res) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("student-db");
    let coll = db.collection("studentDB");
    coll.insertOne(obj)
    .then((result)=> res.send(result))
    .catch((err)=>res.status(500).send(err))
    .finally (()=>client.close())
}

let getAllDetails = (res) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("student-db");
    let coll = db.collection("studentDB");
    coll.find().toArray()
    .then((result)=>res.send(result))
    .catch((err)=>res.send(err))
    .finally(()=>client.close())
}

let deleteDetails = (id, res) =>{
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("student-db");
    let coll = db.collection("studentDB");
    coll.deleteOne({_id: new ObjectId(id)})
    .then((result)=>res.send(result))
    .catch((err)=>res(err))
    .finally(()=>client.close())
}

let updateDetails = (id, obj, res) =>{
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("student-db");
    let coll = db.collection("studentDB");
    const { _id, id: standardId, ...updateData } = obj;
    coll.updateOne({_id: new ObjectId(id)}, {$set: updateData})
    .then((result)=>res.send(result))
    .catch((err)=>res.send(err))
    .finally(()=>client.close())
}

module.exports = { createAccount, loginAccount, addDetails, getAllDetails, deleteDetails, updateDetails };

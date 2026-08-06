const { MongoClient, ObjectId } = require("mongodb");

let url = process.env.MONGO_URL 
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
    coll.insertOne(obj)
    .then((result)=> res.send(result))
    .catch((err)=>res.status(500).send(err))
    .finally (()=>client.close())
}

let loginAccount = (obj,res) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("student-db");
    let coll = db.collection("users");
    coll.findOne({email: obj.email, password: obj.password})
    .then((result) => {
        if (result) {
            res.send({ message: "Login successful", user: result });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    })
    .catch((err) => res.status(500).send(err))
    .finally(() => client.close());
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

module.exports = { createAccount, loginAccount, addDetails, getAllDetails, deleteDetails };

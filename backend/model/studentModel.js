const { MongoClient, ObjectId } = require("mongodb");

let url = process.env.MONGO_URL 
let getCollection = () => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("project1");
    let coll = db.collection("events");
    return { client, coll};
};

let createAccount = (obj,res) => {
    let {client, coll} = getCollection();
    coll.insertOne(obj)
    .then((result)=> res.send(result))
    .catch((err)=>res.status(500).send(err))
    .finally (()=>client.close())
}

let loginAccount = (obj,res) => {
    let {client, coll} = getCollection();
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

module.exports = { createAccount, loginAccount };

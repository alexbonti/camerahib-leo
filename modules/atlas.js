// Connection to Mongo Atlas for Alerts
const MongoClient = require('mongodb').MongoClient;

const config = require("./config.json");
const username = config["DB_USER"];
const password = config["DB_PASSWORD"];
const database = config["DB_NAME"];

const uri = `mongodb+srv://${username}:${password}@cluster0.unvj8.mongodb.net/${database}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

// Get alert documents from mongodb atlas, default to 10 docs
async function getAlertDocuments(query) {
    try {
        await client.connect();
        const collection = client.db(database).collection("Alerts");
        let alertDocuments = await collection.find(query).sort({timestamp: 1}).toArray();
        console.log(alertDocuments);
        // return alertDocuments;
        return new Promise((resolve, reject) => {
            resolve(alertDocuments);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { database, uri, client, getAlertDocuments };
require("dotenv").config(); // loads MONGODB_URI from .env in development
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error("Missing MONGODB_URI environment variable. Set it in .env or your environment.");
    process.exit(1);
}

const client = new MongoClient(uri); // no useNewUrlParser/useUnifiedTopology in v4+

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        // list databases
        await listDatabases(client);

        // OPTIONAL: create contacts DB and insert one sample document
        await createSampleContact(client);
    } catch (err) {
        console.error("MongoDB connection error:", err);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function createSampleContact(client) {
    const db = client.db("contacts");      // will be created on first write
    const people = db.collection("people");

    const sample = {
        name: "Kenneth Maberi",
        email: "kennethmaberi@gmail.com",
        phone: "+256759258859",
        createdAt: new Date()
    };

    const res = await people.insertOne(sample);
    console.log("Inserted sample contact with id:", res.insertedId);

    // show what is in the collection (optional)
    const docs = await people.find().limit(10).toArray();
    console.log("People collection sample docs:", docs);
}

main().catch(err => {
    console.error("Unhandled error in main:", err);
});
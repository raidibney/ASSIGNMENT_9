const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { MongoClient } = require("mongodb");

// Connect using your existing MONGODB_URI environmental variable
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("petDB"); // Matches your pet database name

const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {  
        enabled: true // Necessary to enable email/password signups
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL // URL of this Express server (e.g., http://localhost:5000)
});

module.exports = { auth };
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'socialMedia';

let db;

const connectDB = async () => {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to database');
  db = client.db(dbName);
};

const getDB = () => db;

module.exports = { connectDB, getDB };

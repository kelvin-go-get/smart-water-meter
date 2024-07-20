import mongoose from "mongoose";
import dotenv from "dotenv";
import Customer from "./models/Customer.js"; // Ensure file extension is .js
import Meter from "./models/Meter.js"; // Ensure file extension is .js
import Reading from "./models/Reading.js"; // Ensure file extension is .js

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  // Clear existing data
  await Meter.deleteMany({});
  await Reading.deleteMany({});
  await Customer.deleteMany({});

  // Create sample customers
  const customers = await Customer.insertMany([
    { name: "John Doe", email: "john.doe@example.com", prepaidBalance: 50 },
    { name: "Jane Doe", email: "jane.doe@example.com", prepaidBalance: 30 },
    {
      name: "Mwangi Wanjiku",
      email: "mwangi.wanjiku@example.com",
      prepaidBalance: 75,
    },
    { name: "Real Estate", email: "john@gmail.com", prepaidBalance: 305 },
  ]);

  // Create sample meters
  const meters = await Meter.insertMany([
    { identifier: "KEN-MTR-001", customer: customers[0]._id, status: "on" },
    { identifier: "KEN-MTR-002", customer: customers[1]._id, status: "off" },
    { identifier: "KEN-MTR-003", customer: customers[2]._id, status: "on" },
    { identifier: "KEN-MTR-004", customer: customers[3]._id, status: "on" },
  ]);

  // Create sample readings
  await Reading.insertMany([
    { meter: meters[0]._id, value: 150 },
    { meter: meters[0]._id, value: 200 },
    { meter: meters[1]._id, value: 300 },
    { meter: meters[2]._id, value: 250 },
  ]);

  console.log("Dummy data inserted successfully!");

  // Close the database connection
  mongoose.connection.close();
});

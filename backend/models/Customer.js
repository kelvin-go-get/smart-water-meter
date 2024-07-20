// models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  prepaidBalance: {
    type: Number,
    default: 0,
  },
  // Add any other fields as needed
  meters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meter",
    },
  ],
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;

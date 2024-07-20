// models/Meter.js
import mongoose from "mongoose";

const meterSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // Ensure this references the correct model
    required: true,
  },
  status: {
    type: String,
    enum: ["on", "off"],
    required: true,
  },
});

const Meter = mongoose.model("Meter", meterSchema);
export default Meter;

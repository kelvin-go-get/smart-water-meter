import mongoose from "mongoose";

const readingSchema = new mongoose.Schema({
  meter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meter",
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Reading = mongoose.model("Reading", readingSchema);
export default Reading;

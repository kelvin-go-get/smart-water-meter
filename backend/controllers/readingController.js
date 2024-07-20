import Reading from "../models/Reading.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Add a new meter
export async function addReading(req, res) {
  try {
    console.log("Request body for adding meter:", req.body); // Log request body

    const readings = new Reading(req.body);
    await readings.save();

    console.log("Saved meter:", readings); // Log the saved meter

    res.status(201).json(readings);
  } catch (error) {
    console.error("Error adding meter:", error.message); // Log error message
    res.status(400).json({ message: error.message });
  }
}

export const getReadings = asyncHandler(async (req, res) => {
  try {
    const readings = await Reading.find().populate("readings");
    res.json(readings);
  } catch (error) {
    console.error("Error getting meters:", error.message); // Log error message
    res.status(400).json({ message: error.message });
  }
});

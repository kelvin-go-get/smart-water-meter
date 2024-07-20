import Meter from "../models/Meter.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Add a new meter
export const addMeter = asyncHandler(async (req, res) => {
  try {
    console.log("Request body for adding meter:", req.body);
    const meter = new Meter(req.body);
    await meter.save();
    console.log("Saved meter:", meter);
    res.status(201).json(meter);
  } catch (error) {
    console.error("Error adding meter:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Update an existing meter
export const updateMeter = asyncHandler(async (req, res) => {
  try {
    console.log("Request params for updating meter:", req.params);
    console.log("Request body for updating meter:", req.body);
    const meter = await Meter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!meter) {
      console.log("Meter not found for ID:", req.params.id);
      return res.status(404).json({ message: "Meter not found" });
    }

    console.log("Updated meter:", meter);
    res.json(meter);
  } catch (error) {
    console.error("Error updating meter:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Delete a meter
export const deleteMeter = asyncHandler(async (req, res) => {
  try {
    console.log("Request params for deleting meter:", req.params);
    const meter = await Meter.findByIdAndDelete(req.params.id);

    if (!meter) {
      console.log("Meter not found for ID:", req.params.id);
      return res.status(404).json({ message: "Meter not found" });
    }

    console.log("Deleted meter:", meter);
    res.json({ message: "Meter deleted" });
  } catch (error) {
    console.error("Error deleting meter:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Get all meters
export const getMeters = asyncHandler(async (req, res) => {
  try {
    const meters = await Meter.find().populate("customer");
    res.json(meters);
  } catch (error) {
    console.error("Error getting meters:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Get a specific meter by ID
export const getMeter = asyncHandler(async (req, res) => {
  try {
    const meter = await Meter.findById(req.params.id).populate("customer");
    if (meter) {
      res.status(200).json({
        identifier: meter.identifier,
        id: meter._id,
        customer: meter.customer,
        status: meter.status,
      });
    } else {
      res.status(404).json({ message: "Meter not found" });
    }
  } catch (error) {
    console.error("Error getting meter:", error.message);
    res.status(400).json({ message: error.message });
  }
});

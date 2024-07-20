// controllers/customerController.js
import Customer from "../models/Customer.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const addCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error("Error adding customer:", error.message);
    res.status(400).json({ message: error.message });
  }
});

export const updateCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error("Error updating customer:", error.message);
    res.status(400).json({ message: error.message });
  }
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer deleted" });
  } catch (error) {
    console.error("Error deleting customer:", error.message);
    res.status(400).json({ message: error.message });
  }
});

export const getCustomers = asyncHandler(async (req, res) => {
  try {
    const customers = await Customer.find().populate("meters");
    res.json(customers);
  } catch (error) {
    console.error("Error getting customers:", error.message);
    res.status(400).json({ message: error.message });
  }
});

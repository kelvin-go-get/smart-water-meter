import Payment from "../models/Payment";
import Customer from "../models/Customer";

export async function addPayment(req, res) {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    // Update customer prepaid balance
    await Customer.findByIdAndUpdate(req.body.customer, {
      $inc: { prepaidBalance: req.body.amount },
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getPayments(req, res) {
  try {
    const payments = await Payment.find().populate("customer");
    res.json(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

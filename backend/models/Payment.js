import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Payment = model("Payment", paymentSchema);
export default Payment;

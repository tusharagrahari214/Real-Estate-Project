const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: Number, required: true, unique: true },
  pid: { type: Number },
  seller_id: { type: Number },
  buyer_id: { type: Number },
  transaction_date: { type: Date },
  transaction_amount: { type: Number },
  commission: { type: Number },
  agent_id: { type: Number },
});

module.exports = mongoose.model("Transaction", transactionSchema);

const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  seller_id: { type: Number, unique: true },
  fname: { type: String, maxlength: 50 },
  lname: { type: String, maxlength: 50 },
  phoneno: { type: String, required: true, maxlength: 20 },
  email: { type: String, maxlength: 100 },
  password: { type: String },
  agent_id: { type: Number },
  UPI_ID: { type: String, maxlength: 50 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Seller", sellerSchema);

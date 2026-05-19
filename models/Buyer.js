const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  buyer_id: { type: Number, unique: true },
  fname: { type: String, required: true, maxlength: 50 },
  lname: { type: String, maxlength: 50 },
  phoneno: { type: String, required: true, maxlength: 20 },
  email: { type: String, maxlength: 100 },
  password: { type: String },
  agent_id: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Buyer", buyerSchema);

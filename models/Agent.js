const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  agent_id: { type: Number, required: true, unique: true },
  fname: { type: String, required: true, maxlength: 50 },
  lname: { type: String, maxlength: 50 },
  email: { type: String, maxlength: 50 },
  phoneno: { type: String, required: true, maxlength: 20 },
  city: { type: String, maxlength: 50 },
  street: { type: String, maxlength: 50 },
  postalcode: { type: String, maxlength: 10 },
  commision: { type: Number, default: 0.5 },
  NOP_sale: { type: Number, default: 0 },
  total_saleAmount: { type: Number, default: 0.0 },
  office_id: { type: Number },
});

module.exports = mongoose.model("Agent", agentSchema);

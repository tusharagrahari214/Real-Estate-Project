const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phoneno: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ContactInfo", contactInfoSchema);

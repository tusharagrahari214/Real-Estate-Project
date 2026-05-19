const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 20 },
  password: { type: String, maxlength: 20 },
});

module.exports = mongoose.model("Admin", adminSchema);

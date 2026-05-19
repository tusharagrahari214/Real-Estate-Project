const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
  office_id: { type: Number, required: true, unique: true },
  state: { type: String, maxlength: 50 },
  city: { type: String, maxlength: 50 },
  zip: { type: String, maxlength: 20 },
  phone: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 50 },
  website: { type: String, maxlength: 255 },
});

module.exports = mongoose.model("Office", officeSchema);

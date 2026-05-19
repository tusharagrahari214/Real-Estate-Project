const mongoose = require("mongoose");

const officeLoginSchema = new mongoose.Schema({
  username: { type: String, maxlength: 20 },
  password: { type: String, maxlength: 10 },
});

module.exports = mongoose.model("OfficeLogin", officeLoginSchema);

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  pid: { type: Number, unique: true },
  title: { type: String, maxlength: 200 },
  description: { type: String },
  price: { type: Number },
  status: { type: String, maxlength: 20, default: "available" },
  property_type: { type: String, enum: ["apartment", "house", "hostel", "pg", "villa", "flat"], default: "apartment" },
  listing_type: { type: String, enum: ["buy", "rent"], default: "rent" },
  number_of_bedroom: { type: Number },
  bachelor_allowed: { type: Boolean, default: true },
  furnished: { type: String, enum: ["furnished", "semi-furnished", "unfurnished"], default: "unfurnished" },
  area_sqft: { type: Number },
  seller_id: { type: Number },
  yoc: { type: Number },
  city: { type: String, maxlength: 50 },
  street: { type: String, maxlength: 50 },
  postalcode: { type: String, maxlength: 10 },
  agent_id: { type: Number },
  images: [{ type: String }],
  approved: { type: Boolean, default: false },
  locked_by: { type: Number, default: null },
  locked_at: { type: Date, default: null },
  year_of_sale: { type: Number },
  year_of_listing: { type: Number, default: 2024 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Property", propertySchema);
